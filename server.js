// server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import mysql from 'mysql2/promise';
import swaggerSpec from './swagger.js';

import AuthenticationController from './src/controllers/AuthenticationController.js';
import MemberController from './src/controllers/MemberController.js';

import memberRoutes from './routes/api/memberRoutes.js';
import authenticationRoutes from './routes/api/authenticationRoutes.js';

dotenv.config();

// Create the database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10, // Adjust the limit as needed
  queueLimit: 0
});

const envSetting = {
  secretKey: process.env.SECRET_KEY
}

const reqEmail = {
  host: process.env.API_URL,
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
}

// Initialize the messageController with the database pool
AuthenticationController.init(pool, envSetting, reqEmail);
MemberController.init(pool);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', authenticationRoutes);
app.use('/api', memberRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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