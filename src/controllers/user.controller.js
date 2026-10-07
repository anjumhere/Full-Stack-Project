import jwt from 'jsonwebtoken';
// FIX: mongoose was used in getWatchHistory but never imported -> ReferenceError at runtime
import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// IMPROVE: cookie options were copy-pasted 5 times; defined once now.
// secure:true only in production so cookies also work on plain http during local dev.
// If your frontend is on a different domain, use sameSite: 'none' (requires secure: true).
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
});

// IMPROVE: password rule in one place so register and changePassword stay consistent
const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    // IMPROVE: guard against null user so we don't get a confusing "cannot read property of null"
    if (!user) throw new ApiError(404, 'User not found');

    // IMPROVE: removed useless `await` - these model methods are synchronous (jwt.sign)
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    // IMPROVE: don't swallow our own ApiErrors; only wrap unexpected ones
    if (error instanceof ApiError) throw error;
    console.error('Token generation error:', error);
    throw new ApiError(
      500,
      'Something went wrong while generating access and refresh tokens',
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;

  if (
    [username, email, fullName, password].some(
      (field) => !field || field.toString().trim() === '',
    )
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  // IMPROVE: validate email format and password strength
  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError(400, 'Invalid email format');
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new ApiError(
      400,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    );
  }

  // IMPROVE: normalize once and reuse. Without this "Ali@x.com" and "ali@x.com"
  // become two different accounts.
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();

  // IMPROVE: check the avatar file BEFORE hitting the database (cheaper failure first)
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar image required');
  }

  const existingUser = await User.findOne({
    $or: [{ username: normalizedUsername }, { email: normalizedEmail }],
  });
  if (existingUser) {
    throw new ApiError(409, 'User with email or username already exists');
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, 'Avatar upload failed');
  }

  // FIX: coverImage is optional. The old code did coverImage.url, which crashes
  // with "Cannot read properties of null" when no cover image is sent.
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  const user = await User.create({
    fullName: fullName.trim(),
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    email: normalizedEmail,
    password,
    username: normalizedUsername,
  });
  // NOTE: two simultaneous requests can both pass the findOne check above.
  // Make sure username and email have `unique: true` in the schema as the real safety net.
  // NOTE: if User.create fails, the uploaded Cloudinary images are orphaned.
  // Consider deleting them in a catch block.

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );
  if (!createdUser) {
    throw new ApiError(500, 'Error while registering user');
  }

  // FIX: HTTP status was 201 but ApiResponse said 200. Now consistent.
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, 'User registered successfully!'));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!email && !username) {
    throw new ApiError(400, 'Please provide username or email');
  }
  // FIX: password was never checked. bcrypt.compare(undefined, hash) throws a 500.
  if (!password) {
    throw new ApiError(400, 'Password is required');
  }

  // FIX: registration stores lowercase username/email, so login must lowercase too,
  // otherwise "Ali" can never log in.
  const user = await User.findOne({
    $or: [
      ...(username ? [{ username: username.trim().toLowerCase() }] : []),
      ...(email ? [{ email: email.trim().toLowerCase() }] : []),
    ],
  });

  // SECURITY: the old code returned 404 "User not found" vs 401 "Password wrong",
  // which tells attackers which usernames exist (user enumeration).
  // Now both cases return the same generic message.
  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  const options = getCookieOptions();
  return res
    .status(200)
    .cookie('refreshToken', refreshToken, options)
    .cookie('accessToken', accessToken, options)
    .json(
      // NOTE: tokens in the body are useful for mobile clients, but expose them to JS.
      // For browser-only apps you can drop them and rely on the httpOnly cookies.
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        'User logged in successfully!',
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // FIX: `$set: { refreshToken: undefined }` is unreliable in Mongoose (undefined is
  // ignored/stripped depending on version). $unset actually removes the field.
  await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });

  const options = getCookieOptions();
  return res
    .status(200)
    .clearCookie('refreshToken', options)
    .clearCookie('accessToken', options)
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  // FIX: "Unauthorized" must be 401, not 400
  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Unauthorized request');
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
  } catch (error) {
    // FIX: old code wrapped EVERYTHING in one try/catch, so its own 401 errors
    // got swallowed and re-thrown as 400. Now only jwt.verify is wrapped.
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  // Refresh token rotation: a token that doesn't match the stored one was already used
  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, 'Refresh token expired or has been used');
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessAndRefreshToken(user._id);

  const options = getCookieOptions();
  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        'Access token refreshed',
      ),
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, 'Both oldPassword and newPassword are required');
  }
  // IMPROVE: enforce the same password rule as registration
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    throw new ApiError(
      400,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    );
  }
  if (oldPassword === newPassword) {
    throw new ApiError(400, 'New password must be different from old password');
  }

  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (!(await user.isPasswordCorrect(oldPassword))) {
    throw new ApiError(400, 'Invalid old password');
  }

  user.password = newPassword; // hashed by the pre-save hook in the model
  // IMPROVE: also invalidate existing sessions after a password change
  user.refreshToken = undefined;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Password changed successfully'));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, 'Current user fetched successfully'));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!fullName || !email) {
    throw new ApiError(400, 'All fields are required');
  }
  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError(400, 'Invalid email format');
  }

  const normalizedEmail = email.trim().toLowerCase();

  // FIX: without this, changing to an email that belongs to someone else
  // throws a raw MongoDB duplicate-key error (500).
  const emailTaken = await User.findOne({
    email: normalizedEmail,
    _id: { $ne: req.user._id },
  });
  if (emailTaken) {
    throw new ApiError(409, 'Email already in use');
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { fullName: fullName.trim(), email: normalizedEmail } },
    { new: true },
  ).select('-password -refreshToken');

  return res
    .status(200)
    .json(new ApiResponse(200, user, 'Account details updated successfully'));
});

// IMPROVE: avatar and cover image handlers were 95% identical.
// One factory function removes the duplication.
const makeImageUpdater = (field, label) =>
  asyncHandler(async (req, res) => {
    const localPath = req.file?.path;
    if (!localPath) {
      throw new ApiError(400, `${label} file required`);
    }

    const uploaded = await uploadOnCloudinary(localPath);
    // FIX: old code did `avatar.url` directly, which crashes if upload returned null.
    // Optional chaining makes it a clean 400 instead of a 500.
    if (!uploaded?.url) {
      throw new ApiError(400, `${label} upload failed`);
    }

    // NOTE: the previous image stays on Cloudinary forever.
    // Consider deleting the old one here to save storage.
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { [field]: uploaded.url } },
      { new: true },
    ).select('-password -refreshToken');

    return res
      .status(200)
      .json(new ApiResponse(200, user, `${label} changed successfully`));
  });

const changeUserAvatar = makeImageUpdater('avatar', 'Avatar');
const changeUserCoverImage = makeImageUpdater('coverImage', 'Cover image');

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, 'Username is missing');
  }

  const channel = await User.aggregate([
    { $match: { username: username.trim().toLowerCase() } },
    {
      $lookup: {
        from: 'subscriptions',
        localField: '_id',
        foreignField: 'channel',
        as: 'subscribers',
      },
    },
    {
      $lookup: {
        from: 'subscriptions',
        localField: '_id',
        foreignField: 'subscriber',
        as: 'subscribedTo',
      },
    },
    {
      $addFields: {
        subscribersCount: { $size: '$subscribers' },
        channelsSubscribedToCount: { $size: '$subscribedTo' },
        // IMPROVE: $in already returns a boolean, so the $cond wrapper was redundant.
        // `?? null` avoids passing undefined into the pipeline for logged-out visitors.
        isSubscribed: {
          $in: [req.user?._id ?? null, '$subscribers.subscriber'],
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        // SECURITY: removed `email: 1`. This is a public profile endpoint,
        // so it shouldn't leak users' emails to anyone.
      },
    },
  ]);
  // NOTE: loading full subscriber arrays is fine for small apps, but gets slow for
  // channels with many subscribers. At scale, use $lookup + $count or counters.

  if (!channel?.length) {
    throw new ApiError(404, 'Channel does not exist');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], 'User channel fetched successfully'),
    );
});

const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(req.user._id) } },
    {
      $lookup: {
        from: 'videos',
        localField: 'watchHistory',
        foreignField: '_id',
        as: 'watchHistory',
        pipeline: [
          {
            $lookup: {
              from: 'users',
              localField: 'owner',
              foreignField: '_id',
              as: 'owner',
              pipeline: [{ $project: { fullName: 1, username: 1, avatar: 1 } }],
            },
          },
          { $addFields: { owner: { $first: '$owner' } } },
        ],
      },
    },
  ]);

  // IMPROVE: user[0] could be undefined; optional chaining + fallback avoids a crash
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0]?.watchHistory ?? [],
        'Watch history fetched successfully',
      ),
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  changeUserAvatar,
  changeUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
};
