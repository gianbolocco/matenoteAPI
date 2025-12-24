const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AI Note Taking App API',
            version: '1.0.0',
            description: 'API documentation for the AI Note Taking App',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/docs/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;
