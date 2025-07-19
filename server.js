// server.js
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

import AuthenticationController from './src/controllers/authentication.controller.js';

import authenticationRoutes from './src/routes/authentication.routes.js';
import memberRoutes from './src/routes/member.routes.js';
import provinceRoutes from './src/routes/province.routes.js';
import cityRoutes from './src/routes/city.routes.js';
import rolesRoutes from './src/routes/roles.routes.js';
import newsRoutes from './src/routes/news.routes.js';
import testResultsRoutes from './src/routes/test-results.routes.js';
import itemRoutes from './src/routes/item.routes.js';

const envSetting = {
  secretKey: process.env.SECRET_KEY
}

const reqEmail = {
  host: process.env.APP_URL,
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
}

// Initialize the messageController with the database pool
AuthenticationController.init(envSetting, reqEmail);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', authenticationRoutes);
app.use('/api', memberRoutes);
app.use('/api', provinceRoutes);
app.use('/api', cityRoutes);
app.use('/api', rolesRoutes);
app.use('/api', newsRoutes);
app.use('/api', testResultsRoutes);
app.use('/api', itemRoutes);


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