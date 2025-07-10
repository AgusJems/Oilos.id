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
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter JWT Bearer token **_only_**',
          },
        },
      },

    },
    paths: {
      '/api/getAllUsers': {
        get: {
          summary: 'Get all users',
          description: 'Retrieve a list of all registered users. This endpoint requires authentication.',
          responses: {
            200: {
              description: 'A list of users.',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User', // Reference to a User schema definition
                    },
                  },
                },
              }
            },
            401: {
              description: 'Unauthorized - No token provided or token is invalid'
            },
            403: {
              description: 'Forbidden - User does not have sufficient permissions'
            },
            500: {
              description: 'Internal server error'
            }
          }
        }
      },
    }
  },
  apis: [
    './server.js',
    './src/routes/api/memberRoutes.js',
    './src/routes/api/provinceRoutes.js',
    './src/routes/authentication.routes.js',
    './src/routes/city.routes.js',
  ], // Path to the API routes file(s)
};
// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;