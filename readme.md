# Full-Stack Video Streaming Platform - Backend

A production-ready backend service for a video-sharing platform built with **Node.js**, **Express**, **MongoDB**, and **Cloudinary**. This project demonstrates industry-level architecture with comprehensive user authentication, video management, subscription system, and secure media uploads.

**Author:** Adnan Anjum  
**Version:** 1.0.0  
**License:** ISC

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Architecture & Design](#architecture--design)
- [Core Components](#core-components)
- [Authentication System](#authentication-system)
- [File Upload System](#file-upload-system)
- [Error Handling](#error-handling)
- [Usage Examples](#usage-examples)
- [Extending the Project](#extending-the-project)
- [Best Practices](#best-practices)

---

## 🎯 Overview

This backend service powers a comprehensive video-sharing and streaming platform similar to YouTube. It's built with a strong focus on scalability, security, and maintainability using industry-standard patterns and technologies.

### Core Responsibilities

- **User Management**: Complete user lifecycle from registration through profile management
- **Authentication**: Secure JWT-based authentication with dual token system (access + refresh)
- **Video Management**: Upload, store, and manage video metadata with view tracking
- **Subscription System**: Channel subscription management between users
- **Media Storage**: Cloud-based storage via Cloudinary for reliable file management
- **Data Validation**: Strict Mongoose schema validation with constraints and indexes
- **API Consistency**: Standardized response formatting across all endpoints
- **Error Management**: Global error handling with meaningful messages

The architecture strictly follows the **MVC (Model-View-Controller)** pattern ensuring clear separation of concerns and enhanced maintainability.

---

## ✨ Features

### Authentication & Security

- ✅ **JWT Authentication**: Access token + refresh token system with automatic rotation
- ✅ **Password Security**: bcrypt hashing with 10 salt rounds
- ✅ **Secure HTTP-Only Cookies**: Token storage protected from XSS attacks
- ✅ **Token Refresh Mechanism**: Automatic access token generation via refresh tokens
- ✅ **Protected Routes**: Middleware-based JWT verification for secure endpoints
- ✅ **Password Validation**: Secure password comparison during authentication

### User Management

- ✅ **User Registration**: Complete signup with avatar and cover image uploads
- ✅ **Flexible Login**: Email or username-based authentication
- ✅ **Profile Management**: Update user details, avatar, and cover images
- ✅ **Watch History Tracking**: Record videos watched by each user
- ✅ **Password Management**: Secure password change with old password verification
- ✅ **User Search**: Query users by email or username

### Video Management

- ✅ **Video Uploads**: Support for video files and thumbnails via Cloudinary
- ✅ **Metadata Storage**: Title, description, duration, and view counts
- ✅ **Publication Control**: Toggle video visibility status
- ✅ **View Tracking**: Increment and track video views
- ✅ **Pagination**: Efficient aggregation pagination for video lists
- ✅ **Owner Association**: Link videos to user accounts

### Community Features

- ✅ **Channel Subscriptions**: Users can subscribe to channels
- ✅ **Channel Management**: Users own and manage their channels
- ✅ **Subscriber Tracking**: Track subscriber counts and subscriber lists

### Infrastructure & DevOps

- ✅ **CORS Configuration**: Flexible cross-origin resource sharing
- ✅ **Cookie Management**: Automatic HTTP cookie parsing and management
- ✅ **Static File Serving**: Public asset serving for frontend resources
- ✅ **Environment Configuration**: Flexible .env-based configuration
- ✅ **Global Error Handler**: Centralized error handling middleware
- ✅ **Async Error Wrapper**: Clean async/await error handling without try-catch

---

## 🛠 Tech Stack

### Runtime Dependencies

| Package                          | Version | Purpose                                           |
| -------------------------------- | ------- | ------------------------------------------------- |
| `express`                        | ^5.2.1  | Web framework and HTTP request routing            |
| `mongoose`                       | ^9.6.2  | MongoDB Object Data Modeling (ODM) and validation |
| `cors`                           | ^2.8.6  | Cross-Origin Resource Sharing middleware          |
| `bcrypt`                         | ^6.0.0  | Password hashing and secure comparison            |
| `jsonwebtoken`                   | ^9.0.3  | JWT token creation, verification, and decoding    |
| `cloudinary`                     | ^2.10.0 | Cloud storage and media management                |
| `multer`                         | ^2.1.1  | Multipart form data and file upload handling      |
| `cookie-parser`                  | ^1.4.7  | HTTP cookie parsing and management                |
| `dotenv`                         | ^17.4.2 | Environment variable loading from .env file       |
| `mongoose-aggregate-paginate-v2` | ^1.1.4  | Pagination plugin for MongoDB aggregation queries |

### Development Dependencies

| Package    | Version | Purpose                               |
| ---------- | ------- | ------------------------------------- |
| `nodemon`  | ^3.1.14 | Auto-restart server on file changes   |
| `eslint`   | ^10.4.1 | JavaScript code linting and analysis  |
| `prettier` | ^3.8.4  | Code formatting and style enforcement |

### External Services

- **MongoDB**: NoSQL database for flexible document storage
- **Cloudinary**: Cloud storage for media files (videos, images)

---

## 📁 Project Structure

```
Full-Stack-Project/
├── src/
│   ├── index.js                    # Server entry point & app initialization
│   ├── app.js                      # Express app configuration & middleware setup
│   ├── constants.js                # Application constants (database names, etc.)
│   │
│   ├── db/
│   │   └── index.js                # MongoDB connection & initialization
│   │
│   ├── models/                     # Mongoose schemas & data models
│   │   ├── user.model.js          # User schema with authentication methods
│   │   ├── video.model.js         # Video schema with pagination support
│   │   └── subscription.model.js  # Subscription schema for channel relationships
│   │
│   ├── controllers/                # Business logic & request handlers
│   │   └── user.controller.js     # All user-related operations
│   │
│   ├── routes/                     # API endpoint definitions
│   │   └── user.routes.js         # User endpoints and route configuration
│   │
│   ├── middleware/                 # Custom middleware functions
│   │   ├── auth.middleware.js     # JWT verification and authentication
│   │   └── multer.middleware.js   # File upload configuration & handling
│   │
│   └── utils/                      # Helper utilities & utility functions
│       ├── asyncHandler.js        # Async route handler wrapper for error handling
│       ├── ApiError.js            # Custom error class for standardized errors
│       ├── ApiResponse.js         # Standardized API response wrapper class
│       └── cloudinary.js          # Cloudinary configuration & upload functions
│
├── public/
│   └── temp/                       # Temporary directory for file uploads
│
├── .env                            # Environment variables (create from .env.example)
├── .gitignore                      # Git ignore patterns
├── package.json                    # Project metadata and dependencies
├── jsconfig.json                   # JavaScript configuration for IDE
└── readme.md                       # This documentation file
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager (comes with Node.js)
- **MongoDB** - either local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud
- **Cloudinary Account** - for media storage ([Sign up](https://cloudinary.com/))
- **Git** - for version control ([Download](https://git-scm.com/))

### Installation Steps

1. **Clone the repository:**

```bash
git clone <repository-url>
cd Full-Stack-Project
```

2. **Install dependencies:**

```bash
npm install
# or with yarn
yarn install
```

3. **Create environment configuration:**

Create a `.env` file in the project root directory:

```bash
cp .env.example .env  # if template exists
# or create manually
touch .env
```

4. **Verify MongoDB connection:**

Make sure MongoDB is running:

- **Local:** `mongod` should be running
- **Cloud:** Ensure MongoDB Atlas connection string is valid

5. **Test installation:**

```bash
npm run dev
```

You should see:

```
MONGODB CONNECTED SUCCESSFULLY: localhost
Server started in port 8000
```

---

## ⚙️ Environment Configuration

### Creating .env File

Create a `.env` file in your project root with the following variables:

```env
# ==================== SERVER CONFIGURATION ====================
PORT=8000
NODE_ENV=development

# ==================== DATABASE CONFIGURATION ====================
MONGODB_URI=mongodb://localhost:27017
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net
DB_NAME=firstdb

# ==================== CORS CONFIGURATION ====================
CORS_ORIGIN=http://localhost:3000
# Comma-separated for multiple origins: http://localhost:3000,http://localhost:3001

# ==================== JWT CONFIGURATION ====================
# Generate using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
ACCESS_TOKEN_SECRET=your_super_secret_access_token_key_here_must_be_min_32_chars
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_here_must_be_min_32_chars

# Token Expiry Times
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# ==================== CLOUDINARY CONFIGURATION ====================
# Get these from: https://dashboard.cloudinary.com/
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Environment Variables Reference

| Variable                | Type   | Required | Description                          | Example                 |
| ----------------------- | ------ | -------- | ------------------------------------ | ----------------------- |
| `PORT`                  | Number | ✅       | Server listening port                | `8000`                  |
| `NODE_ENV`              | String | ❌       | Environment (development/production) | `development`           |
| `MONGODB_URI`           | String | ✅       | MongoDB connection string            | See examples above      |
| `DB_NAME`               | String | ✅       | Database name                        | `firstdb`               |
| `CORS_ORIGIN`           | String | ✅       | Allowed frontend origin(s)           | `http://localhost:3000` |
| `ACCESS_TOKEN_SECRET`   | String | ✅       | Secret key for access tokens         | Random 32+ char string  |
| `REFRESH_TOKEN_SECRET`  | String | ✅       | Secret key for refresh tokens        | Random 32+ char string  |
| `ACCESS_TOKEN_EXPIRY`   | String | ✅       | Access token expiration time         | `15m`, `1h`             |
| `REFRESH_TOKEN_EXPIRY`  | String | ✅       | Refresh token expiration time        | `7d`, `30d`             |
| `CLOUDINARY_CLOUD_NAME` | String | ✅       | Cloudinary cloud name                | Your Cloudinary name    |
| `CLOUDINARY_API_KEY`    | String | ✅       | Cloudinary API key                   | Your API key            |
| `CLOUDINARY_API_SECRET` | String | ✅       | Cloudinary API secret                | Your API secret         |

### Generating Secure Secrets

Generate random secrets for JWT tokens:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32

# Using Python
python3 -c "import secrets; print(secrets.token_hex(32))"
```

---

## 🏃 Running the Project

### Development Mode

Start the server with automatic restart on file changes (using **nodemon**):

```bash
npm run dev
```

**Output:**

```
MONGODB CONNECTED SUCCESSFULLY : localhost
Server started in port 8000
```

**Features:**

- Auto-restart on file changes
- Environment variables loaded from `.env`
- Full error stack traces
- Debug logging enabled

### Production Mode

For production deployment:

```bash
node src/index.js
```

**Note:** Ensure `NODE_ENV=production` in `.env` for production settings.

---

## 📡 API Endpoints

### Base URL

```
http://localhost:8000/api/v1
```

### User Endpoints

All endpoints are prefixed with `/api/v1/users`

#### 1️⃣ Register User

**Endpoint:** `POST /users/register`

**Description:** Create a new user account with avatar and optional cover image

**Authentication:** Not required

**Request (multipart/form-data):**

```
Field          | Type   | Required | Description
---------------|--------|----------|---------------------------
username       | String | ✅       | Unique username (lowercase)
email          | String | ✅       | Unique email address
fullName       | String | ✅       | User's full name
password       | String | ✅       | Account password
avatar         | File   | ✅       | Avatar image file
coverImage     | File   | ❌       | Cover image file
```

**Success Response (201):**

```json
{
  "statusCode": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "avatar": "https://res.cloudinary.com/.../avatar.jpg",
    "coverImage": "https://res.cloudinary.com/.../cover.jpg",
    "watchHistory": [],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "User registered successfully",
  "success": true
}
```

**Error Response (400/409):**

```json
{
  "statusCode": 400,
  "message": "All fields are required",
  "errors": [],
  "success": false
}
```

#### 2️⃣ Login User

**Endpoint:** `POST /users/login`

**Description:** Authenticate user with email/username and password

**Authentication:** Not required

**Request (JSON):**

```json
{
  "email": "john@example.com",
  "username": "johndoe",
  "password": "password123"
}
```

**Note:** Provide either `email` OR `username` (not both required)

**Success Response (200):**

```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "email": "john@example.com",
      "fullName": "John Doe",
      "avatar": "https://res.cloudinary.com/.../avatar.jpg"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User Loggedin successfully",
  "success": true
}
```

**Cookies Set:** `accessToken`, `refreshToken` (HTTP-Only)

#### 3️⃣ Logout User

**Endpoint:** `POST /users/logout`

**Description:** Logout user and invalidate refresh token

**Authentication:** Required (JWT)

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "data": {},
  "message": "User loggedOut successfully!",
  "success": true
}
```

**Cookies Cleared:** `accessToken`, `refreshToken`

#### 4️⃣ Refresh Access Token

**Endpoint:** `POST /users/refresh-token`

**Description:** Generate new access token using refresh token

**Authentication:** Not required (uses refresh token)

**Request (JSON):**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "data": {
    "accessToken": "new_access_token_jwt",
    "refreshToken": "new_refresh_token_jwt"
  },
  "message": "Access Token refreshed",
  "success": true
}
```

#### 5️⃣ Change Password

**Endpoint:** `POST /users/change-password`

**Description:** Update user password with verification of old password

**Authentication:** Required (JWT)

**Request (JSON):**

```json
{
  "oldPassword": "currentPassword123",
  "newPassword": "newPassword456"
}
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Password changed successfully",
  "success": true
}
```

#### 6️⃣ Get Current User

**Endpoint:** `GET /users/current-user`

**Description:** Fetch authenticated user's profile

**Authentication:** Required (JWT)

**Success Response (200):**

```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "avatar": "https://res.cloudinary.com/.../avatar.jpg",
    "coverImage": "https://res.cloudinary.com/.../cover.jpg"
  },
  "message": "Current User fetched successfully",
  "success": true
}
```

#### 7️⃣ Update Account Details

**Endpoint:** `PUT /users/account-details`

**Description:** Update user's email and full name

**Authentication:** Required (JWT)

**Request (JSON):**

```json
{
  "email": "newemail@example.com",
  "fullName": "New Full Name"
}
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "newemail@example.com",
    "fullName": "New Full Name"
  },
  "message": "Account details updated successfully",
  "success": true
}
```

#### 8️⃣ Update Avatar

**Endpoint:** `PATCH /users/avatar`

**Description:** Update user's avatar image

**Authentication:** Required (JWT)

**Request (multipart/form-data):**

```
avatar: [image file]
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "data": {
    "avatar": "https://res.cloudinary.com/.../avatar_new.jpg"
  },
  "message": "Avatar updated successfully",
  "success": true
}
```

#### 9️⃣ Update Cover Image

**Endpoint:** `PATCH /users/cover-image`

**Description:** Update user's cover image

**Authentication:** Required (JWT)

**Request (multipart/form-data):**

```
coverImage: [image file]
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "data": {
    "coverImage": "https://res.cloudinary.com/.../cover_new.jpg"
  },
  "message": "Cover image updated successfully",
  "success": true
}
```

---

## 🗄️ Database Models

### User Model

**File:** `src/models/user.model.js`

**Purpose:** Represents a user account in the system

**Schema:**

```javascript
{
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  avatar: {
    type: String,  // Cloudinary URL
    required: true
  },
  coverImage: {
    type: String,  // Cloudinary URL
    optional
  },
  password: {
    type: String,
    required: true,
    private: true  // Never returned in queries
  },
  refreshToken: {
    type: String,
    optional,
    private: true
  },
  watchHistory: [{
    type: Schema.Types.ObjectId,
    ref: 'Video'
  }],
  timestamps: true  // createdAt, updatedAt
}
```

**Methods:**

- **`isPasswordCorrect(password)`** - Compare plain password with bcrypt hash

  ```javascript
  const isValid = await user.isPasswordCorrect('plainPassword');
  ```

- **`generateAccessToken()`** - Generate JWT access token (15m expiry)

  ```javascript
  const token = user.generateAccessToken();
  ```

- **`generateRefreshToken()`** - Generate JWT refresh token (7d expiry)
  ```javascript
  const token = user.generateRefreshToken();
  ```

**Pre-save Hooks:**

- Automatically hashes password using bcrypt when modified before saving

---

### Video Model

**File:** `src/models/video.model.js`

**Purpose:** Represents a video in the system

**Schema:**

```javascript
{
  Videofile: {
    type: String,  // Cloudinary URL
    required: true
  },
  thumbnail: {
    type: String,  // Cloudinary URL
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,  // in seconds, from Cloudinary
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamps: true  // createdAt, updatedAt
}
```

**Plugins:**

- `mongoose-aggregate-paginate-v2` - Enables pagination on aggregation queries

**Features:**

- View count tracking
- Publication status control
- Owner association for permission checks
- Efficient pagination support

---

### Subscription Model

**File:** `src/models/subscription.model.js`

**Purpose:** Represents channel subscriptions

**Schema:**

```javascript
{
  subscriber: {
    type: Schema.Types.ObjectId,
    ref: 'User'  // User who is subscribing
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'User'  // User's channel being subscribed to
  },
  timestamps: true  // createdAt, updatedAt
}
```

**Purpose:** Many-to-many relationship tracking which users subscribe to which channels

---

## 🏗️ Architecture & Design

### MVC Pattern

```
Routes (Input)
    ↓
Middleware (CORS, Auth, Validation)
    ↓
Controllers (Business Logic)
    ↓
Models (Data Layer)
    ↓
Database (Persistence)
    ↓
Response (Output via ApiResponse)
```

### Request/Response Flow

```
1. Client sends HTTP request
        ↓
2. Express receives and applies middleware
        ↓
3. Router matches endpoint and calls controller
        ↓
4. Controller uses asyncHandler to wrap logic
        ↓
5. Business logic executes (may interact with Models)
        ↓
6. Models query/update database via Mongoose
        ↓
7. Response created using ApiResponse class
        ↓
8. Response sent back to client
```

### Error Handling Flow

```
Route Handler
    ↓
asyncHandler wrapper
    ↓
Controller logic
    ↓
If error: throw ApiError
    ↓
asyncHandler catches error
    ↓
Error passed to next(error)
    ↓
Global error middleware catches
    ↓
Standardized error response sent
```

### Design Principles

- **Separation of Concerns**: Each file has a single, well-defined responsibility
- **DRY (Don't Repeat Yourself)**: Shared utilities prevent code duplication
- **Consistency**: Standardized response and error formats across all endpoints
- **Scalability**: Modular structure allows easy addition of new features
- **Security**: Multiple layers of protection (password hashing, JWT, input validation)
- **Maintainability**: Clear naming conventions and code organization

---

## 🔧 Core Components

### Utilities

#### AsyncHandler

**File:** `src/utils/asyncHandler.js`

Wraps async route handlers to catch promise rejections automatically.

```javascript
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      next(error); // Pass to error middleware
    });
  };
};
```

**Benefits:**

- Eliminates try-catch boilerplate
- Automatically passes errors to error middleware
- Makes code cleaner and more readable

**Usage:**

```javascript
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(new ApiResponse(200, user, 'User fetched'));
});
```

#### ApiResponse

**File:** `src/utils/ApiResponse.js`

Standardized response class for consistent API responses.

```javascript
class ApiResponse {
  constructor(statusCode, data, message = 'success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; // Auto-determine success
  }
}
```

**Response Format:**

```json
{
  "statusCode": 200,
  "data": {
    /* response data */
  },
  "message": "Operation successful",
  "success": true
}
```

**Usage:**

```javascript
res
  .status(200)
  .json(new ApiResponse(200, userData, 'User fetched successfully'));
```

#### ApiError

**File:** `src/utils/ApiError.js`

Custom error class for standardized error handling.

```javascript
class ApiError extends Error {
  constructor(
    statusCode,
    message = 'Something went wrong',
    errors = [],
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}
```

**Error Response Format:**

```json
{
  "statusCode": 400,
  "message": "Error description",
  "errors": [
    /* additional error details */
  ],
  "success": false
}
```

**Usage:**

```javascript
if (!user) {
  throw new ApiError(404, 'User not found', ['userId: invalid']);
}
```

#### Cloudinary Upload

**File:** `src/utils/cloudinary.js`

Handles file upload to Cloudinary cloud storage.

```javascript
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto', // Auto-detect file type
    });

    fs.unlinkSync(localFilePath); // Delete local copy
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Cleanup on error
    return null;
  }
};
```

**Features:**

- Automatic file type detection
- Cleanup of temporary files after upload
- Error handling with cleanup on failure
- Returns Cloudinary URL for storage in database

**Response:**

```javascript
{
  public_id: "user_avatar_12345",
  url: "https://res.cloudinary.com/.../avatar.jpg",
  secure_url: "https://res.cloudinary.com/.../avatar.jpg",
  format: "jpg",
  width: 400,
  height: 400,
  duration: undefined  // Only for videos
}
```

### Middleware

#### JWT Authentication Middleware

**File:** `src/middleware/auth.middleware.js`

Verifies JWT tokens and extracts user information.

```javascript
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select(
      '-password -refreshToken',
    );

    if (!user) {
      throw new ApiError(401, 'Invalid access Token');
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || 'Invalid Access Token');
  }
});
```

**Purpose:**

- Extract token from cookies or Authorization header
- Verify token signature using SECRET
- Decode user information
- Attach user object to request for use in controllers

**Usage:**

```javascript
router.post('/logout', verifyJWT, logoutUser);
// User is now available as req.user in logoutUser controller
```

#### Multer Upload Middleware

**File:** `src/middleware/multer.middleware.js`

Configures file upload handling with temporary storage.

```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/temp'); // Temporary storage
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep original filename
  },
});

export const upload = multer({ storage });
```

**Usage:**

```javascript
router.post(
  '/register',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  registerUser,
);

// Files accessible as:
// req.files.avatar[0].path
// req.files.coverImage[0].path
```

---

## 🔐 Authentication System

### Token System

#### Access Token

- **Purpose:** Authenticates API requests
- **Expiry:** 15 minutes (configurable)
- **Storage:** HTTP-only cookie or Authorization header
- **Payload:**
  ```json
  {
    "_id": "user_id",
    "email": "user@example.com",
    "fullName": "User Name",
    "username": "username",
    "iat": 1234567890,
    "exp": 1234568790
  }
  ```

#### Refresh Token

- **Purpose:** Generates new access tokens
- **Expiry:** 7 days (configurable)
- **Storage:** HTTP-only cookie or database
- **Payload:**
  ```json
  {
    "_id": "user_id",
    "iat": 1234567890,
    "exp": 1234653290
  }
  ```

### Token Rotation Flow

```
1. User logs in with credentials
   ↓
2. Server generates both tokens
   ↓
3. Tokens sent to client (cookies + response body)
   ↓
4. Client stores tokens
   ↓
5. Client uses access token for API requests
   ↓
6. Access token expires (15 minutes)
   ↓
7. Client sends refresh token to /refresh-token endpoint
   ↓
8. Server validates refresh token against database
   ↓
9. Server generates new tokens if valid
   ↓
10. Client updates tokens and continues
```

### Security Features

- ✅ **Password Hashing:** bcrypt with 10 salt rounds
- ✅ **HTTP-Only Cookies:** Prevents JavaScript access (XSS protection)
- ✅ **Secure Flag:** HTTPS-only in production
- ✅ **Token Verification:** Signature validation on every request
- ✅ **Token Expiry:** Automatic expiration and refresh
- ✅ **Refresh Token Rotation:** New refresh token on each refresh
- ✅ **Database Validation:** Refresh token stored and validated in database

### Login Process

```javascript
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // 1. Find user by email or username
  const user = await User.findOne({ $or: [{ username }, { email }] });

  // 2. Verify password
  const isPasswordValid = await user.isPasswordCorrect(password);

  // 3. Generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  // 4. Send response with tokens in cookies
  res
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(new ApiResponse(200, { user, accessToken, refreshToken }, '...'));
});
```

---

## 📤 File Upload System

### Upload Flow

```
User submits form with file
    ↓
Multer middleware processes file
    ↓
File saved to ./public/temp/
    ↓
uploadOnCloudinary() called
    ↓
File uploaded to Cloudinary
    ↓
Temporary file deleted
    ↓
Cloudinary URL stored in database
    ↓
Temporary directory cleaned up
```

### Supported Formats

**Images:**

- JPG/JPEG, PNG, GIF, WebP, BMP, TIFF

**Videos:**

- MP4, WebM, AVI, MOV, FLV, MPEG (via Cloudinary auto-detection)

### Upload Endpoints

#### User Registration with Files

```
POST /users/register
Content-Type: multipart/form-data

username: johndoe
email: john@example.com
fullName: John Doe
password: password123
avatar: [image file]
coverImage: [image file]
```

#### Update Avatar

```
PATCH /users/avatar
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data

avatar: [image file]
```

---

## ⚠️ Error Handling

### Global Error Handler

Configured in `src/app.js`:

```javascript
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
    statusCode: statusCode,
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

### HTTP Status Codes

| Code | Type       | Meaning                          | Example                 |
| ---- | ---------- | -------------------------------- | ----------------------- |
| 200  | ✅ Success | Request successful               | Get user, login success |
| 201  | ✅ Success | Resource created                 | User registration       |
| 400  | ❌ Client  | Invalid request/bad input        | Missing fields          |
| 401  | ❌ Client  | Unauthorized/invalid credentials | Invalid token           |
| 403  | ❌ Client  | Forbidden/no permission          | Access denied           |
| 404  | ❌ Client  | Resource not found               | User not found          |
| 409  | ❌ Client  | Conflict (duplicate resource)    | Email already exists    |
| 500  | ❌ Server  | Internal server error            | Database crash          |

### Common Errors

```json
// Missing required fields
{
  "statusCode": 400,
  "message": "All fields are required",
  "success": false
}

// Duplicate email/username
{
  "statusCode": 409,
  "message": "User with email or username already exists",
  "success": false
}

// Invalid credentials
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "success": false
}

// Expired token
{
  "statusCode": 401,
  "message": "Invalid or expired token",
  "success": false
}
```

---

## 💻 Usage Examples

### Example 1: User Registration

```javascript
// Frontend code
async function registerUser() {
  const formData = new FormData();
  formData.append('username', 'johndoe');
  formData.append('email', 'john@example.com');
  formData.append('fullName', 'John Doe');
  formData.append('password', 'securepass123');

  const avatarFile = document.querySelector('input[name="avatar"]').files[0];
  const coverFile = document.querySelector('input[name="cover"]').files[0];

  formData.append('avatar', avatarFile);
  formData.append('coverImage', coverFile);

  const response = await fetch('http://localhost:8000/api/v1/users/register', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  console.log('User registered:', data.data);
}
```

### Example 2: User Login

```javascript
async function loginUser() {
  const response = await fetch('http://localhost:8000/api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies
    body: JSON.stringify({
      username: 'johndoe',
      password: 'securepass123',
    }),
  });

  const data = await response.json();
  const { accessToken, refreshToken } = data.data;

  // Store tokens
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}
```

### Example 3: Making Authenticated Request

```javascript
async function getProfile() {
  const accessToken = localStorage.getItem('accessToken');

  const response = await fetch('http://localhost:8000/api/v1/users/profile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();
  return data.data;
}
```

### Example 4: Refreshing Access Token

```javascript
async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');

  const response = await fetch(
    'http://localhost:8000/api/v1/users/refresh-token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    },
  );

  const data = await response.json();
  const newAccessToken = data.data.accessToken;

  localStorage.setItem('accessToken', newAccessToken);
  return newAccessToken;
}
```

---

## 🚀 Extending the Project

### Adding a New Model

1. **Create schema** in `src/models/feature.model.js`:

```javascript
import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamps: true,
});

export const Feature = mongoose.model('Feature', featureSchema);
```

### Adding a New Controller

2. **Create controller** in `src/controllers/feature.controller.js`:

```javascript
import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Feature } from '../models/feature.model.js';

export const createFeature = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const feature = await Feature.create({
    name,
    createdBy: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, feature, 'Feature created'));
});

export const getFeatures = asyncHandler(async (req, res) => {
  const features = await Feature.find();
  res.status(200).json(new ApiResponse(200, features, 'Features fetched'));
});
```

### Adding Routes

3. **Create routes** in `src/routes/feature.routes.js`:

```javascript
import { Router } from 'express';
import {
  createFeature,
  getFeatures,
} from '../controllers/feature.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/create', verifyJWT, createFeature);
router.get('/list', getFeatures);

export default router;
```

### Register Routes in App

4. **Import and register** in `src/app.js`:

```javascript
import featureRouter from './routes/feature.routes.js';

app.use('/api/v1/features', featureRouter);
```

---

## ✅ Best Practices

### Code Organization

- ✅ Keep controllers focused on request/response handling
- ✅ Move complex business logic to services if needed
- ✅ Use middleware for cross-cutting concerns (auth, logging, etc.)
- ✅ Follow naming conventions: camelCase for variables, PascalCase for classes
- ✅ Keep files organized in their respective folders
- ✅ Avoid circular dependencies

### Security Practices

- ✅ Never commit `.env` files to version control
- ✅ Hash all passwords with bcrypt
- ✅ Use HTTPS in production (set `secure: true` on cookies)
- ✅ Validate and sanitize all user inputs
- ✅ Implement rate limiting for sensitive endpoints
- ✅ Use parameterized queries (Mongoose does this automatically)
- ✅ Never expose sensitive info in error messages
- ✅ Set appropriate CORS origins

### Performance Optimization

- ✅ Use pagination for large datasets
- ✅ Add database indexes for frequently queried fields
- ✅ Cache frequently accessed data
- ✅ Use select() to limit returned fields
- ✅ Implement request timeout limits
- ✅ Use CDN for static assets
- ✅ Optimize database queries using explain()

### Error Handling

- ✅ Use consistent error response format
- ✅ Provide meaningful error messages
- ✅ Log errors for debugging and monitoring
- ✅ Don't expose stack traces in production
- ✅ Use appropriate HTTP status codes
- ✅ Handle async errors properly with asyncHandler

### Database Practices

- ✅ Use transactions for multi-step operations
- ✅ Validate data before saving
- ✅ Create indexes for frequently queried fields
- ✅ Use timestamps for audit trails
- ✅ Implement soft deletes for important data
- ✅ Backup data regularly
- ✅ Monitor database performance

### Testing

- ✅ Write unit tests for utilities and helpers
- ✅ Test API endpoints with sample data
- ✅ Test error scenarios and edge cases
- ✅ Use test database separate from production
- ✅ Automate tests in CI/CD pipeline
- ✅ Test authentication and authorization
- ✅ Test file upload functionality

---

## 📞 Support & Troubleshooting

### Common Issues

**Database Connection Error:**

```
MONGODB CONNECTION FAILED: Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Ensure MongoDB is running or update MONGODB_URI in .env

**Token Expired Error:**

```
401 Unauthorized: Invalid or expired token
```

**Solution:** Call refresh-token endpoint to get new access token

**File Upload Failed:**

```
400 Bad Request: Avatar upload failed
```

**Solution:** Check Cloudinary credentials and ensure file size is within limits

**CORS Error:**

```
Cross-Origin Request Blocked
```

**Solution:** Update CORS_ORIGIN in .env to match frontend URL

---

## 📜 License

This project is licensed under the **ISC License**.

## 👤 Author

**Adnan Anjum**

---

**Last Updated:** January 2024  
**Current Version:** 1.0.0
