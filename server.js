// server.js
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import messageController from './src/controllers/messageController.js';
import mysql from 'mysql2/promise';
import AuthenticationController from './src/controllers/AuthenticationController.js';

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

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'API documentation for your Express application',
    },
  },
  apis: ['./server.js'], // Path to the API routes file(s)
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Initialize the messageController with the database pool
AuthenticationController.init(pool);
messageController.init(pool);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Use the controller's methods directly in the routes
app.get('/api/message', messageController.getMessage);
app.get('/api/users/:userId/message', messageController.getUserMessage);

app.post('/api/login', AuthenticationController.login);

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
