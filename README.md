# Task Manager

Task Manager is a web application for basic task management. It allows users to sign up, log in, create, view, update, and delete tasks.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Backend API](#backend-api)
- [Frontend Pages](#frontend-pages)
- [NPM Scripts](#npm-scripts)
- [Useful Links](#useful-links)
- [Contact](#contact)

## Features

### User-side features

- User Registration (Signup)
- User Login
- User Logout
- Add New Tasks
- View Tasks
- Update Tasks
- Delete Tasks

### Developer-side features

- Success and Error Message Toasts
- Frontend and Backend Form Validation
- Responsive Navbar
- Token-based Authentication
- Custom 404 Page for Invalid URLs
- Global User State Management with Redux
- Custom Loaders
- Layout Components for Pages
- Use of Theme Colors
- No External CSS Files (Tailwind CSS)
- Tooltips
- Dynamic Document Titles
- Redirect to Previous Page After Login
- Use of Various React Hooks
- Custom Hook (useFetch)
- Route Protection
- Middleware for User Verification in the Backend
- HTTP Status Codes for Responses
- Follows Standard Practices

## Technologies

- HTML
- CSS
- JavaScript
- Tailwind CSS
- Node.js
- Express.js
- React
- Redux
- MongoDB

## Dependencies

Major dependencies of the project:

- axios
- react
- react-dom
- react-redux
- react-router-dom
- react-toastify
- redux
- redux-thunk
- bcrypt
- cors
- dotenv
- express
- jsonwebtoken
- mongoose

## Dev Dependencies

Major dev dependencies of the project:

- nodemon
- concurrently

## Prerequisites

Before getting started, make sure you have the following prerequisites:

- Node.js installed on your system.
- MongoDB database.
- Code editor (recommended: VS Code).

## Installation and Setup

1. Install all project dependencies by running:

   ```sh
   npm run install-all