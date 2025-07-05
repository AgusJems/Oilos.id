// server.js
import express from 'express';
import cors from 'cors';
import messageController from './src/controllers/messageController.js';
import mysql from 'mysql2/promise'; // Use promise wrapper for pool

// Create the database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Adjust the limit as needed
  queueLimit: 0
});

// Initialize the messageController with the database pool
messageController.init(pool);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Use the controller's methods directly in the routes
app.get('/api/message', messageController.getMessage);
app.get('/api/users/:userId/message', messageController.getUserMessage);

// Start the server
app.listen(port, () => {
  console.log(`Express backend listening at http://localhost:${port}`);
});

// Handle graceful shutdown and close the connection pool
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing database pool.');
  try {
    await pool.end(); // Close the connection pool
    console.log('MySQL database pool closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing database pool:', err);
    process.exit(1);
  }
});
