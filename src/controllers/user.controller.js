import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../utils/ApiError.js';
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
});

export { registerUser };
