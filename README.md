# Laundry App Website

The Laundry Application is a web-based platform designed to simplify the process of managing laundry services. Users can easily schedule pickups, track the status of their laundry, and receive notifications when their clothes are ready for delivery. The application offers a user-friendly interface, secure payment options, and real-time updates to enhance the overall laundry experience.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)


## Features

- User authentication (signup, login, logout) with JWT
- Product browsing and searching
- Available Services browsing and searching functionality
- Order placemen with stripe payment gateway
- Admin panel for product and user management
- Responsive design for various devices

## Getting Started

To run this project locally, follow the steps below.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js and npm
- MongoDB

## Installation

Clone the repository:

```bash
https://github.com/prathyanthDhanus/Laundry-backend.git
```

Install server dependencies:

```bash
Change to the corresponding directory, then type npm install.
```


Configure environment variables:
Create a .env file in the server directory and add the following:

```bash
  MONGODB_URL_1 = your_mongodb_url
  USERSECRET_KEY = Give_ your user_secret_key
  ADMINSECRET_KEY = Give your admin secret key
  DELIVERY_AGENTSECRET_KEY  = Give your delivery boy secret key
 APP_EMAIL= Give an email for nodemailer
 APP_PASSWORD = Give that password
  STRIPE_SECRET_KEY = your_stripe_secret_key
```

Run the server:

```bash
 npm start
```


The server will be running at http://localhost:3000.

## Folder Structure
- `/src/apps`: Node.js and Express.js server application

## Technologies Used

- Backend:
  - Node.js & Express.js
  - MongoDB for database
  - JWT for authentication
  - Nodemailer for sending otp
  - Stripe for payment gateway
  - Bcrypt for password hashing
  - Cloudinary for image upload

