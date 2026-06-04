import asyncHandler from '../utils/asyncHandler.js';
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - no empty
  // check if user already exsists : username/email
  // check for images - check for avatar( compulsory)
  // upload them to cloudinary, avatar
  // create user-object - create entry in db
  // remove password and refresh token fields from response
  // check for user creation if received null or created
  // return response

  const { username, email, fullName, password } = req.body;
  console.log('email', email, 'password', password);
});

export { registerUser };
