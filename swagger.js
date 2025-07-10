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
            code: { type: 'string' },
            code_referral: { type: 'string' },
            roles_code: { type: 'string' },
            roles_name: { type: 'string' },
            cities_name: { type: 'string' },
            provinces_name: { type: 'string' },
            status: { type: 'integer' },
          },
          required: ['id', 'username', 'name', 'identity', 'phone', 'email', 'area', 'status', 'roles_code', 'roles_name', 'cities_name', 'provinces_name'],
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
            codeReferral: { type: 'string' },
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
  },
  apis: [
    './server.js',
    './src/routes/authentication.routes.js',
    './src/routes/member.routes.js',
    './src/routes/province.routes.js',
    './src/routes/city.routes.js',
  ], // Path to the API routes file(s)
};
// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;