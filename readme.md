# Full-Stack Video Streaming Platform - Backend

A production-ready backend service for a video-sharing platform built with **Node.js**, **Express**, **MongoDB**, and **Cloudinary**. This project provides industry-level code structure with user authentication, video management, and secure file uploads.

**Author:** Adnan Anjum  
**Version:** 1.0.0  
**License:** ISC

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Routes](#api-routes)
- [Database Models](#database-models)
- [Architecture & Design](#architecture--design)
- [Utilities & Helpers](#utilities--helpers)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [File Upload](#file-upload)
- [Extension Guide](#extension-guide)

---

## 🎯 Overview

This backend service is designed to power a video-sharing platform similar to YouTube. It handles:

- **User Management**: Registration, authentication, profile management
- **Video Management**: Upload, metadata storage, view tracking
- **Authentication**: JWT-based token system with access and refresh tokens
- **Secure Storage**: Cloudinary integration for video and image uploads
- **Data Validation**: Mongoose schema validation with required fields and constraints
- **Error Management**: Standardized API error responses
- **API Response Formatting**: Consistent response structure across all endpoints

The architecture follows **MVC (Model-View-Controller)** pattern with separated concerns for better maintainability and scalability.

---

## ✨ Features

- ✅ **User Authentication**: JWT-based authentication with refresh token rotation
- ✅ **Password Security**: bcrypt hashing for password storage
- ✅ **Video Upload**: Support for video file uploads via Cloudinary
- ✅ **Watch History**: Track user's video watch history
- ✅ **Pagination**: Built-in aggregation pagination for video queries
- ✅ **CORS Support**: Configurable cross-origin resource sharing
- ✅ **Cookie Management**: Secure HTTP-only cookies for tokens
- ✅ **Static File Serving**: Public asset serving
- ✅ **Environment Configuration**: Flexible configuration via environment variables
- ✅ **Error Handling**: Global error handling middleware with standardized responses
- ✅ **Async Handler**: Wrapper for cleaner async/await error handling in routes

---

## 🛠 Tech Stack

### Runtime Dependencies

| Package                          | Version | Purpose                               |
| -------------------------------- | ------- | ------------------------------------- |
| `express`                        | ^5.2.1  | Web framework and routing             |
| `mongoose`                       | ^9.6.2  | MongoDB ODM                           |
| `cors`                           | ^2.8.6  | Cross-origin resource sharing         |
| `bcrypt`                         | ^6.0.0  | Password hashing                      |
| `jsonwebtoken`                   | ^9.0.3  | JWT token generation and verification |
| `cloudinary`                     | ^2.10.0 | Cloud storage for files               |
| `multer`                         | ^2.1.1  | Middleware for file uploads           |
| `cookie-parser`                  | ^1.4.7  | Cookie parsing middleware             |
| `dotenv`                         | ^17.4.2 | Environment variable management       |
| `mongoose-aggregate-paginate-v2` | ^1.1.4  | Pagination for aggregation queries    |

### Development Dependencies

| Package    | Version | Purpose                             |
| ---------- | ------- | ----------------------------------- |
| `nodemon`  | ^3.1.14 | Auto-restart server on file changes |
| `prettier` | ^3.8.3  | Code formatting                     |

---

## 📁 Project Structure

```
Full-Stack-Project/
├── src/
│   ├── index.js                 # Application entry point
│   ├── app.js                   # Express app configuration
│   ├── constants.js             # Shared constants
│   ├── db/
│   │   └── index.js            # MongoDB connection
│   ├── models/
│   │   ├── user.model.js       # User schema and methods
│   │   └── video.model.js      # Video schema
│   ├── controllers/
│   │   └── user.controller.js  # User business logic
│   ├── routes/
│   │   └── user.routes.js      # User API endpoints
│   ├── middleware/
│   │   └── multer.middleware.js # File upload configuration
│   └── utils/
│       ├── ApiError.js          # Custom error class
│       ├── ApiResponse.js       # Standard response wrapper
│       ├── asyncHandler.js      # Async error wrapper
│       └── cloudinary.js        # Cloudinary configuration
├── public/
│   └── temp/                    # Temporary file storage
├── package.json                 # Dependencies and scripts
├── env                          # Environment variables (not in git)
└── readme.md                    # This file
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn** package manager
- **MongoDB** (local or Atlas cloud)
- **Cloudinary** account for file storage
- **Git** for version control

### Steps

1. **Clone the repository:**

```bash
git clone <repository-url>
cd Full-Stack-Project
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create environment file:**

Create a `.env` file in the project root with the following variables (see [Configuration](#configuration) section for details).

4. **Verify MongoDB connection:**

Ensure MongoDB is running on your system or you have a valid MongoDB Atlas URL.

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017
DB_NAME=videodb

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# JWT Secrets (generate strong random strings)
ACCESS_TOKEN_SECRET=your-access-token-secret-key-min-32-chars
REFRESH_TOKEN_SECRET=your-refresh-token-secret-key-min-32-chars

# Token Expiry
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Cloudinary Configuration (for file uploads)
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### Required Environment Variables

| Variable                | Description                   | Example                     |
| ----------------------- | ----------------------------- | --------------------------- |
| `PORT`                  | Server listening port         | `8000`                      |
| `MONGODB_URI`           | MongoDB connection string     | `mongodb://localhost:27017` |
| `DB_NAME`               | Database name                 | `videodb`                   |
| `CORS_ORIGIN`           | Allowed frontend origin       | `http://localhost:3000`     |
| `ACCESS_TOKEN_SECRET`   | Secret for access JWT tokens  | Generated random string     |
| `REFRESH_TOKEN_SECRET`  | Secret for refresh JWT tokens | Generated random string     |
| `ACCESS_TOKEN_EXPIRY`   | Access token expiration time  | `15m` or `1h`               |
| `REFRESH_TOKEN_EXPIRY`  | Refresh token expiration time | `7d` or `30d`               |
| `CLOUDINARY_NAME`       | Cloudinary project name       | Your Cloudinary name        |
| `CLOUDINARY_API_KEY`    | Cloudinary API key            | Your API key                |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret         | Your API secret             |

---

## 🏃 Running the Project

### Development Mode

Start the server with automatic restart on file changes:

```bash
npm run dev
```

The server will start on the port specified in your `.env` file (default: 8000).

**Output:**

```
Database connected successfully
Server is running at port 8000
```

### Production Mode

For production deployment, use:

```bash
node src/index.js
```

---

## 🔌 API Routes

### Base URL

```
http://localhost:8000/api/v1
```

### User Routes

**Prefix:** `/users`

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| `POST` | `/register`        | Create new user account          |
| `POST` | `/login`           | User login                       |
| `POST` | `/logout`          | User logout                      |
| `POST` | `/refresh-token`   | Refresh access token             |
| `GET`  | `/profile`         | Get user profile (protected)     |
| `PUT`  | `/profile`         | Update user profile (protected)  |
| `POST` | `/change-password` | Change user password (protected) |

---

## 📊 Database Models

### User Model

Located in [src/models/user.model.js](src/models/user.model.js)

**Schema Fields:**

```javascript
{
  username: String (unique, lowercase, indexed),
  email: String (unique, lowercase),
  fullName: String (required, indexed),
  avatar: String (Cloudinary URL, required),
  coverImage: String (Cloudinary URL, optional),
  password: String (hashed with bcrypt),
  refreshToken: String (for token rotation),
  watchHistory: [ObjectId] (references Video model),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

**Methods:**

- `isPasswordCorrect(password)` - Verify password against hash
- `generateAccessToken()` - Create short-lived JWT token
- `generateRefreshToken()` - Create long-lived JWT token

---

### Video Model

Located in [src/models/video.model.js](src/models/video.model.js)

**Schema Fields:**

```javascript
{
  Videofile: String (Cloudinary URL, required),
  thumbnail: String (Cloudinary URL, required),
  title: String (required),
  description: String (required),
  duration: Number (in seconds, from Cloudinary),
  views: Number (default: 0),
  isPublished: Boolean (default: true),
  owner: ObjectId (references User model),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

**Features:**

- Pagination support via `mongoose-aggregate-paginate-v2` plugin
- View count tracking
- Publication status flag

---

## 🏗 Architecture & Design

### MVC Pattern

The project follows the **Model-View-Controller** architectural pattern:

- **Model** (`src/models/`): Mongoose schemas defining database structure
- **Controller** (`src/controllers/`): Business logic for handling requests
- **View** (Frontend): Not included in this backend project

### Request Flow

```
Client Request
    ↓
Express Middleware (CORS, body parsing, cookies)
    ↓
Route Handler
    ↓
Controller (Business Logic)
    ↓
Database (Mongoose Model)
    ↓
Response (ApiResponse utility)
    ↓
Client
```

### Key Design Principles

- **Separation of Concerns**: Each file has a single responsibility
- **DRY (Don't Repeat Yourself)**: Shared utilities for common operations
- **Error Handling**: Centralized error management
- **Configuration Management**: Environment-based configuration
- **Security**: Password hashing, JWT authentication, CORS protection

---

## 🛠 Utilities & Helpers

### ApiError Class

**File:** [src/utils/ApiError.js](src/utils/ApiError.js)

Custom error class for standardized error responses:

```javascript
import { ApiError } from './ApiError.js';

throw new ApiError(400, 'Invalid email format');
```

**Parameters:**

- `statusCode` (Number): HTTP status code
- `message` (String): Error message
- `errors` (Array): Additional error details
- `stack` (String): Error stack trace

---

### ApiResponse Class

**File:** [src/utils/ApiResponse.js](src/utils/ApiResponse.js)

Standard response wrapper for all API responses:

```javascript
import { ApiResponse } from './ApiResponse.js';

res.status(200).json(new ApiResponse(200, data, 'User fetched successfully'));
```

**Response Structure:**

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Success message",
  "success": true
}
```

---

### asyncHandler Utility

**File:** [src/utils/asyncHandler.js](src/utils/asyncHandler.js)

Wrapper function for handling async route handlers without try-catch boilerplate:

```javascript
import { asyncHandler } from './asyncHandler.js';

const registerUser = asyncHandler(async (req, res) => {
  // Your async logic here
  // Errors are automatically caught and passed to error handler
});
```

---

### Cloudinary Configuration

**File:** [src/utils/cloudinary.js](src/utils/cloudinary.js)

Helper functions for uploading and managing files on Cloudinary:

```javascript
import { uploadToCloudinary, deleteFromCloudinary } from './cloudinary.js';

const result = await uploadToCloudinary(filePath, 'video');
```

---

## 🔒 Middleware

### CORS Middleware

Configured in [src/app.js](src/app.js)

```javascript
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
```

- **Credentials**: Enabled for cookie-based authentication
- **Origin**: Configurable via `CORS_ORIGIN` environment variable

### Body Parser Middleware

```javascript
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
```

- **JSON**: Parse JSON request bodies
- **URL Encoded**: Parse form-encoded data
- **Limit**: 16KB size limit per request

### Cookie Parser Middleware

```javascript
app.use(cookieParser());
```

- Parses HTTP cookies
- Used for token storage

### Multer Middleware

**File:** [src/middleware/multer.middleware.js](src/middleware/multer.middleware.js)

Handles file uploads to temporary storage:

```javascript
import { upload } from './multer.middleware.js';

router.post('/upload', upload.single('videoFile'), controller.uploadVideo);
```

---

## ⚠️ Error Handling

### Global Error Handler Middleware

Configured in [src/app.js](src/app.js)

```javascript
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
  });
});
```

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "errors": [],
  "statusCode": 400
}
```

### Common HTTP Status Codes

| Code | Meaning      | Example               |
| ---- | ------------ | --------------------- |
| 200  | OK           | Request successful    |
| 201  | Created      | Resource created      |
| 400  | Bad Request  | Invalid input         |
| 401  | Unauthorized | Missing/invalid token |
| 403  | Forbidden    | No permission         |
| 404  | Not Found    | Resource not found    |
| 500  | Server Error | Internal error        |

---

## 📤 File Upload

### Multer Configuration

Files are uploaded to the `public/temp/` directory before being processed and sent to Cloudinary.

**Upload Flow:**

1. Client uploads file via `multipart/form-data`
2. Multer saves file to `public/temp/`
3. Controller retrieves file and uploads to Cloudinary
4. Cloudinary URL stored in database
5. Temporary file deleted

---

## 🔧 Extension Guide

### Adding a New Route

1. **Create Controller** (`src/controllers/newfeature.controller.js`):

```javascript
import { asyncHandler } from '../utils/asyncHandler.js';

export const createFeature = asyncHandler(async (req, res) => {
  // Your logic here
  res.status(200).json(new ApiResponse(200, data, 'Success'));
});
```

2. **Create Route** (`src/routes/newfeature.routes.js`):

```javascript
import { Router } from 'express';
import { createFeature } from '../controllers/newfeature.controller.js';

const router = Router();
router.post('/create', createFeature);

export default router;
```

3. **Register Route** in [src/app.js](src/app.js):

```javascript
import featureRouter from './routes/newfeature.routes.js';
app.use('/api/v1/features', featureRouter);
```

### Adding Authentication Middleware

Create `src/middleware/auth.middleware.js`:

```javascript
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header('Authorization')?.replace('Bearer ', '');

  if (!token) throw new ApiError(401, 'Unauthorized');

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.user = decoded;
  next();
});
```

### Adding New Model

Create `src/models/newmodel.model.js`:

```javascript
import mongoose, { Schema } from 'mongoose';

const newSchema = new Schema(
  {
    field1: { type: String, required: true },
    field2: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const NewModel = mongoose.model('NewModel', newSchema);
```

---

## 📝 Development Best Practices

1. **Environment Variables**: Never commit `.env` file to version control
2. **Error Handling**: Always use `ApiError` for consistent error responses
3. **Response Format**: Always use `ApiResponse` for consistent responses
4. **Async Handlers**: Use `asyncHandler` wrapper for route handlers
5. **Validation**: Validate input in controllers before database operations
6. **Security**: Use HTTPS in production, sanitize user inputs
7. **Logging**: Add request logging for debugging and monitoring
8. **Tests**: Write unit and integration tests for critical paths

---

## 🔐 Security Considerations

- **Password Security**: Passwords are hashed with bcrypt (salt rounds: 10)
- **Token Security**: JWT tokens have expiration times
- **CORS**: Configured to accept requests only from specified origin
- **Cookies**: HTTP-only cookies prevent XSS attacks
- **Environment Variables**: Sensitive data stored in environment, not in code
- **Input Validation**: Mongoose schema validation enforces data integrity

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Multer Documentation](https://github.com/expressjs/multer)

---

## 📞 Support & Contribution

For issues, feature requests, or contributions, please open an issue or pull request on the repository.

**Maintainer:** Adnan Anjum

---

**Last Updated:** June 2026  
**Status:** Active Development

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
