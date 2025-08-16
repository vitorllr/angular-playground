# Angular JWT Auth Demo

This project is a demonstration application of JWT authentication using Angular on the frontend and a separate backend API.

## About the Project

The goal of this project is to show how to implement JSON Web Token (JWT) authentication in an Angular application, including:
- User login
- Route protection
- HTTP request interception to send the JWT token
- Example of consuming a protected API

## Project Structure
- **Frontend:** Angular (this folder)
- **Backend/API:** Located in `../api/loginjwt` (outside this folder)

## How to Start the Project

### 1. Start the API (Backend)
Navigate to the API folder and start the backend server. Example:

```bash
cd ../api/loginjwt
```
# Build and run the Spring Boot API
```bash
./mvnw spring-boot:run
```
### 2. Start the Frontend (Angular)
Open a new terminal window or tab, go to the frontend folder, and run:

```bash
cd ../angular-jwt-auth-demo
npm install
ng serve
