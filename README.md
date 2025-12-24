# AI Note Taking App Backend

Backend service for the AI Note Taking Application, built with Node.js, Express, and a layered Service-Repository architecture.

## Features

- **MVC Architecture**: Clean separation of concerns (Controllers, Services, Repositories).
- **User CRUD**: Complete management of users (Create, Read, Update, Delete).
- **Swagger Documentation**: Interactive API documentation available.
- **Health Check**: `/health` endpoint for monitoring.
- **Error Handling**: Centralized error management with custom exceptions.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (optional, defaults provided):
   ```env
   PORT=5000
   NODE_ENV=development
   ```

### Running the Server

- **Development** (with hot-reload):
  ```bash
  npm run dev
  ```
- **Production**:
  ```bash
  npm start
  ```

## API Documentation

Once the server is running, access the full API reference at:

[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## Project Structure

- `src/controllers`: Handles incoming HTTP requests.
- `src/services`: Contains business logic and validation.
- `src/repositories`: Manages data access (currently in-memory).
- `src/models`: Data models/classes.
- `src/routes`: API route definitions.
- `src/docs`: Swagger JSDoc definitions.
- `src/utils`: Utility classes (e.g., Custom Errors).
- `src/middleware`: Express middleware (e.g., Error Handler).
