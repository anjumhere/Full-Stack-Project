import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
// get user details from frontend
// validation - if not empty
// check if user or email already exsists
// check for images / check for avatar which is required
// upload them to cloudinary which would return a url
// create a user object - create entry in mongodb
// remove password and refresh token from field
// remove password and refresh token from field
// check if user is created / check if not null

// create method for generating access and refresh token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      'Something went wrong while generating access and refresh tokens',
    );
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;

  // 1. Validation
  if (
    [fullName, username, email, password].some(
      (field) => !field || field.toString().trim() === '',
    )
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  // 2. Check existence
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, 'User with email or username already exists');
  }

  // 3. Get file paths
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar image is required');
  }

  // 4. Upload to Cloudinary FIRST
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, 'Avatar upload failed');
  }

  // 5. Create User in Database
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    email,
    password,
    username: username.toLowerCase(), // Corrected function call
  });

  // 6. Final verification
  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }

  // 7. Send Response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, 'User registered successfully'));
});
const loginUser = asyncHandler(async (req, res) => {
  // get data form req.body
  const { username, email, password } = req.body;
  if (!email && !username) {
    throw new ApiError(400, 'Please provide username or email');
  }

  // find the user in the db
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(400, 'User not found');
  }
  // check password using bcrypt.compare
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Password wrong');
  }

  // generate access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  // remove password from the user beofore sending cookies
  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  //send cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie('refreshToken', refreshToken, options)
    .cookie('accesstoken', accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        'User Loggedin successfully',
      ),
    );
});
export { registerUser, loginUser };
