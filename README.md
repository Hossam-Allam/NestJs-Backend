NestJS User Registration and Verification Project
This project is a simple NestJS application for user registration and email verification. It utilizes TypeORM for database operations and integrates with NestJS Mailer for sending verification emails using Gmail SMTP. Handlebars is used for email templating.

Features
User Registration:

Endpoint: POST /users/register
Parameters: { username, email }
Action:
Generates a random verification token.
Saves user data (username, email, verification token, isVerified=false) to a MySQL database.
Sends a verification email to the user's email address.
Email Verification:

Endpoint: GET /users/verify-email/:username/:verificationToken
URL Parameters: { username, verificationToken }
Action:
Verifies the user's email based on the provided verification token.
Sets isVerified=true in the database for the user if the token matches.
Returns success message upon successful verification.
Check Verification Status:

Endpoint: GET /users/check-verification/:username
URL Parameters: { username }
Action:
Checks if the user with the specified username is verified (isVerified=true).
Returns appropriate message indicating if the user is verified or not.
Project Structure
src/: Contains the source code of the application.

app.module.ts: Main module of the application where TypeORM and Mailer modules are configured.
user/:
user.module.ts: NestJS module for user-related functionalities.
user.controller.ts: Controller handling HTTP requests related to user operations (registration, verification, status check).
user.service.ts: Service layer implementing business logic for user operations (register, verify email, check verification status).
user.entity.ts: TypeORM entity representing the User table in the database.
templates/: Contains Handlebars email templates for verification emails.
ormconfig.js: Configuration file for TypeORM, specifying database connection details.

Prerequisites
Before running the application, ensure you have the following installed:

Node.js
npm (Node Package Manager)
MySQL Database
Gmail account (for SMTP setup)
