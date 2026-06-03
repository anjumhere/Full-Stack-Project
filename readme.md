# Backend Project

A professional backend service scaffold built with Node.js, Express, and MongoDB.

## Overview

This repository provides a clean backend foundation for a production-ready web application. It includes:

- Express server setup with modern middleware configuration
- MongoDB connection using Mongoose
- Environment-based configuration with `dotenv`
- CORS support, JSON parsing, URL-encoded body handling, cookie parsing, and static file serving

## Project Structure (detailed)

- `src/index.js` - application bootstrap and server startup (loads `./env`, connects to MongoDB and starts the HTTP server)
- `src/app.js` - Express app instance, middleware registration, and static file serving
- `src/db/index.js` - MongoDB connection helper using `mongoose` (connectDB)
- `src/constants.js` - shared constants (e.g. database name `firstdb`)
- `src/models/` - Mongoose data models
  - `user.model.js` - `User` model (username, email, fullName, avatar, password, refreshToken, watchHistory)
  - `video.model.js` - `Video` model (file, thumbnail, title, description, duration, views, owner)
- `src/utils/` - helper utilities
  - `ApiError.js` - custom error class to standardize API errors
  - `ApiResponse.js` - standard API response wrapper
  - `asyncHandler.js` - convenience wrapper for async route handlers
- `public/` - static assets served by Express
- `src/controllers/` - application controllers (add your route handlers here)
- `src/middleware/` - custom Express middleware
- `readme.md` - this file
- `package.json` - project metadata, dependencies and `npm` scripts

## Key files explained

- `src/index.js`: Initializes environment variables from `./env`, calls `connectDB()` and starts the HTTP server.
- `src/app.js`: Creates and exports the Express `app` instance, enables CORS (reads `CORS_ORIGIN`), JSON/body parsing, cookie parsing and serves `public/`.
- `src/db/index.js`: Exports an async `connectDB()` function that connects to `${MONGODB_URI}/${DB_NAME}` and logs the host.
- `src/models/*`: Mongoose schemas for `User` and `Video` including relations (`owner`, `watchHistory`) and utility methods (token generation, password checks).
- `src/utils/*`: Small helpers used across controllers to normalize error/response shapes and wrap async handlers.

## Dependencies (from `package.json`)

### Runtime

- express
- cors
- cookie-parser
- dotenv
- mongoose
- bcrypt
- jsonwebtoken
- mongoose-aggregate-paginate-v2

### Development

- nodemon
- prettier

## Environment Variables

Create an `env` file at the project root (the project loads `./env` via `dotenv`). Example:

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017
CORS_ORIGIN=http://localhost:3000
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

Required values:

- `PORT` - server listening port
- `MONGODB_URI` - base MongoDB URI (database name appended from `src/constants.js`)
- `CORS_ORIGIN` - allowed origin for CORS
- `ACCESS_TOKEN_SECRET` / `REFRESH_TOKEN_SECRET` - JWT secrets for token generation
- `ACCESS_TOKEN_EXPIRY` / `REFRESH_TOKEN_EXPIRY` - token expiry configuration

## Scripts

Install dependencies:

```bash
npm install
```

Run in development mode (uses `nodemon` and loads `./env`):

```bash
npm run dev
```

## How to extend

- Add controllers in `src/controllers/` and wire routes in a routes file (e.g., `src/routes/`)
- Add middleware in `src/middleware/` and register with `app.use()` in `src/app.js`
- Add model methods or indexes inside `src/models/` and import them in controllers

## Notes & tips

- The project uses ES modules (`type: "module"` in `package.json`).
- Static files are served from `public/`.
- The database name is defined in `src/constants.js` as `firstdb`.

## Project Overview

This project is a full-stack backend foundation built with Node.js, Express, MongoDB, and common middleware. It is structured to help you learn how a modern backend is organized and how the main pieces interact.

### Project Structure

- `.gitignore`
- `.prettierignore`
- `.prettierrc`
- `env` (environment variables file; not committed)
- `package.json`
- `package-lock.json`
- `readme.md`
- `public/`
  - `temp/`
    - `.gitkeep`
- `src/`
  - `app.js`
  - `constants.js`
  - `index.js`
  - `db/`
    - `index.js`
  - `middleware/`
    - `multer.middleware.js`
  - `models/`
    - `user.model.js`
    - `video.model.js`
  - `utils/`
    - `ApiError.js`
    - `ApiResponse.js`
    - `asyncHandler.js`
    - `cloudinary.js`

### Installed Dependencies

#### Runtime dependencies

- `bcrypt` - password hashing
- `cloudinary` - media upload and management
- `cookie-parser` - HTTP cookie parsing
- `cors` - Cross-Origin Resource Sharing support
- `dotenv` - environment variable loading
- `express` - web server framework
- `jsonwebtoken` - JWT access/refresh token handling
- `mongoose` - MongoDB object modeling
- `mongoose-aggregate-paginate-v2` - pagination helper for Mongoose aggregation pipelines
- `multer` - file upload handling

#### Development dependencies

- `nodemon` - development server reloading
- `prettier` - code formatting

If you'd like, I can also generate a `CONTRIBUTING.md` and add examples for common routes (auth, upload, list videos).
