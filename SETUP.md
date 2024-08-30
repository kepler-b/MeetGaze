# MeetGaze Setup Instructions

Follow these steps to set up the MeetGaze application on your local machine.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)

## Client Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the client directory and add the following:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```
   npm start
   ```

The client should now be running on `http://localhost:3000`.

## Server Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory and add the following:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/meetgaze
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the server:
   ```
   npm run dev
   ```

The server should now be running on `http://localhost:5000`.

## Running the Application

With both the client and server running, you can now use the MeetGaze application by opening `http://localhost:3000` in your web browser.

## Troubleshooting

- If you encounter any issues with dependencies, try deleting the `node_modules` folder and running `npm install` again.
- Ensure that MongoDB is running on your machine before starting the server.
- Check that the ports 3000 and 5000 are not being used by other applications.

For more detailed information or if you encounter any issues, please refer to the project documentation or open an issue on the project repository.
