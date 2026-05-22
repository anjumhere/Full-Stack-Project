# Backend Project

A professional backend service scaffold built with Node.js, Express, and MongoDB.

## Overview

This repository provides a clean backend foundation for a production-ready web application. It includes:

- Express server setup with modern middleware configuration
- MongoDB connection using Mongoose
- Environment-based configuration with `dotenv`
- CORS support, JSON parsing, URL-encoded body handling, cookie parsing, and static file serving

## Project Structure

- `src/index.js` - application bootstrap and server startup
- `src/app.js` - Express app instance and middleware configuration
- `src/db/index.js` - MongoDB connection logic using `mongoose`
- `src/constants.js` - shared application constants
- `public/` - static asset directory
- `src/controllers/`, `src/models/`, `src/middleware/`, `src/utils/` - reserved directories for application logic, data models, middleware, and helper utilities

## Dependencies

### Runtime

- `express` - web server framework
- `cors` - cross-origin request handling
- `cookie-parser` - cookie parsing middleware
- `dotenv` - environment variable loader
- `mongoose` - MongoDB object modeling and connection management

### Development

- `nodemon` - automatic server restart during development
- `prettier` - code formatting

## Environment Variables

The project loads environment variables from a custom `./env` file.

Required values:

- `PORT` - server listening port
- `MONGODB_URI` - MongoDB connection URI
- `CORS_ORIGIN` - allowed origin for CORS

## Usage

Install dependencies:

```bash
npm install
```

Run in development mode:

```bash
npm run dev
```

## Notes

- The Express app is configured to serve static files from `public/`.
- The database name is defined in `src/constants.js` as `firstdb`.
- The application uses ES module syntax with `type: "module"` enabled in `package.json`.
