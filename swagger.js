import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'API documentation for your Express application',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            username: { type: 'string' },
            name: { type: 'string' },
            identity: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string' },
            area: { type: 'string' },
            status: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'username', 'name', 'identity', 'phone', 'email', 'area', 'status', 'createdAt', 'updatedAt'],
        },
        UserUpdateInput: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            name: { type: 'string' },
            identity: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string' },
            area: { type: 'string' },
            codeRefferal: { type: 'string' },
          },
        },

      },
    },
  },
  apis: [
    '/home/user/Oilos.id/server.js',
    '/home/user/Oilos.id/routes/api/memberRoutes.js',
    '/home/user/Oilos.id/routes/api/authenticationRoutes.js',
  ], // Path to the API routes file(s)
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;