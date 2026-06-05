import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - if not empty
  // check if user or email already exsists
  // check for images / check for avatar which is required
  // upload them to cloudinary which would return a url
  // create a user object - create entry in mongodb
  // remove password and refresh token from field
  // remove password and refresh token from field
  // check if user is created / check if not null

  const { username, fullName, email, password } = req.body;
  console.log(`Email = ${email}`);

  // validation
  if (
    [fullName, username, email, password].some((field) => field?.trim() === '')
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  //check if user and email already exsists

  const exsistedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (exsistedUser) {
    throw new ApiError(409, 'User with email or username already exsits');
  }
  //check if avatar and cover image are available
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, 'avatar image required');
  }

  //upload them to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, 'avatar image required');
  }
  // create an entry in the databse
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url?.toLocaleLowerCase() || '',
    username: username.toLocaleLowerCase(),
    email,
    password,
  });
  const createdUser = await user
    .findById(user._id)
    .select('-password -refreshToken');
  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering User');
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, 'User created Successfully'));
});

export { registerUser };
