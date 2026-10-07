import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // FIX: the old code wrapped everything in one try/catch and rethrew every
  // error as 401 with error.message. That means a real database failure
  // (connection lost, etc.) was reported to the client as "Unauthorized" with
  // the internal error message leaked. Now only jwt.verify is wrapped, so
  // DB errors correctly bubble up as 500s.

  // IMPROVE: `.replace('Bearer ', '')` also accepts a raw token with no
  // "Bearer" prefix and silently mangles odd headers. Parse it explicitly.
  const authHeader = req.header('Authorization');
  const headerToken = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : null;

  const token = req.cookies?.accessToken || headerToken;

  if (!token) {
    throw new ApiError(401, 'Unauthorized request');
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    // IMPROVE: give the client a useful, safe message. The frontend can use
    // "Access token expired" to trigger a call to /refresh-token.
    // SECURITY: don't forward raw error.message from the jwt library.
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Access token expired');
    }
    throw new ApiError(401, 'Invalid access token');
  }

  const user = await User.findById(decodedToken?._id).select(
    '-password -refreshToken',
  );

  // FIX: a valid token for a user that no longer exists is an authentication
  // failure, not "404 Not Found". 404 also tells an attacker that the token
  // was well-formed and signed correctly. Return 401.
  if (!user) {
    throw new ApiError(401, 'Invalid access token');
  }

  req.user = user;
  next();
});
