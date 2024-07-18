# Video Platform Backend

This repository contains the backend implementation for a Video Platform application built using Node.js, Express, MongoDB, and other technologies.

## Table of Contents

1. [Introduction](#introduction)
2. [Project Setup](#project-setup)
3. [Features](#features)
4. [Endpoints](#endpoints)
5. [Project Structure](#project-structure)
6. [ER Diagram](#er-diagram)
7. [Installation](#installation)
8. [Usage](#usage)
9. [Contributing](#contributing)
10. [License](#license)

## Introduction

This backend repository serves as the foundation for a Video Platform application. It includes features such as user authentication, admin video uploads, password reset functionalities, and more.

## Project Setup

### Technologies Used

- Node.js
- Express.js
- MongoDB

### Dependencies

```json
{
  "dependencies": {
    "bcrypt": "^5.1.1",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-validator": "^7.1.0",
    "http": "^0.0.1-security",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.5.1",
    "nodemailer": "^6.9.14",
    "nodemon": "^3.1.4"
  }
}
```

## Features

- **User Authentication**: Allows users to sign up, log in, and verify their email addresses.
- **Password Reset**: Provides functionality for users to reset their passwords via email.
- **Admin Video Upload**: Enables administrators to upload videos to the platform.

## Endpoints

### Authentication

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Authenticate user and get a JWT token.
- **GET /api/auth/verify/:token**: Verify user's email address.
- **POST /api/auth/forgot-password**: Initiate password reset process.
- **POST /api/auth/reset-password/:token**: Reset user's password.

### Videos

- **POST /api/videos/upload**: Upload a new video (requires admin privileges).
- **GET /api/videos/:id**: Fetch a specific video.
- **GET /api/videos/**: Fetch all videos.
- **DELETE /api/videos/:id**: Delete a video (requires admin privileges).
- **PUT /api/videos/:id**: Update a video (requires admin privileges).

### Users

- **GET /api/users/:id**: Fetch a specific user (requires authentication).
- **GET /api/users/**: Fetch all users (requires authentication).

## Project Structure

The project structure is organized as follows:

```
project-root
│
├── index.js           # Entry point of the application
├── routes/            # Directory for route definitions
│   ├── AuthRoute.js        # Authentication routes
│   ├── UserRoute.js       # User routes
│   └── VideoRoute.js      # Video routes
├── models/            # Directory for Mongoose models
│   ├── userModel.js        # User model
│   └── videoModel.js       # Video model
├── controllers/       # Directory for route controllers
│   └── AuthController.js  # Controller for auth-related actions
│   └── UserController.js  # Controller for user-related actions
│   └── VideoController.js  # Controller for video-related actions
├── middleware/        # Directory for middleware functions
│   ├── authMiddleware.js        # Authentication middleware
│   └── adminMiddleware.js       # Admin role verification middleware
│   └── validateEmail.js       # Email validation middleware
├── ER_diagram.png     # Entity-Relationship diagram illustrating database structure
├── .env       # Environment variables configuration file (e.g., MONGODB_URL, JWTKEY, etc )
├── .gitignore         # Git ignore file
├── package.json       # Node.js dependencies and scripts
└── README.md          # Project README file
```

## ER Diagram

Include your ER diagram here, illustrating the database structure of your application.

![ER Diagram](ER_diagram.png)

## Installation

To run this project locally, clone the repository and install dependencies using npm:

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

## Usage

Before running the application, make sure to set up your MongoDB connection and configure environment variables (see `.env.example`).

```bash
# Start the server
npm start
```

The server will run on `http://localhost:5000` by default.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request for any enhancements or fixes.

## License

This project is licensed under the [ISC License](LICENSE).
