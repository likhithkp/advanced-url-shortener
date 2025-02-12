# Advanced URL Shortener

This is a URL Shortener service built with Node.js, Express, PostgreSQL, and Redis for caching. It generates short URLs for long ones and retrieves the original URL when requested.

## Features
- Generate a short URL for a given long URL
- Retrieve the original URL using the short URL
- Store previously requested URLs in Redis for faster access
- Prevent duplicate short URLs for the same long URL
- API response handling with proper status codes

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Cache**: Redis
- **Security**: Helmet, CORS

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up the `.env` file with the following variables:
   ```env
   DATABASE_URL=your_postgres_connection_string
   REDIS_HOST=localhost
   REDIS_PORT=6379
   BASE_URL=http://localhost:3001
   ```

4. Run database migrations:
   ```sh
   npx sequelize-cli db:migrate
   ```

5. Start the Redis server (if not already running):
   ```sh
   redis-server
   ```

6. Start the application:
   ```sh
   npm start
   ```

## API Endpoints

### Shorten URL
- **Endpoint**: `POST /shorten`
- **Request Body**:
  ```json
  {
    "url": "https://www.example.com/long-url-to-shorten"
  }
  ```
- **Response**:
  ```json
  {
    "status": 201,
    "data": {
      "shortUrl": "http://localhost:3000/abc123"
    },
    "message": "URL shortened successfully.",
    "error": null
  }
  ```

### Retrieve Original URL
- **Endpoint**: `GET /:shortCode`
- **Response**:
  ```json
  {
    "status": 200,
    "data": {
      "originalUrl": "https://www.example.com/long-url-to-shorten"
    },
    "message": "URL retrieved successfully.",
    "error": null
  }
  ```

## Future Improvements
- Implement user authentication for URL management
- Add analytics tracking for shortened URLs
- Implement a frontend UI

## License
MIT License
