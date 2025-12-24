const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

const app = express();

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/health', healthRoutes);
app.use('/users', userRoutes);
const noteRoutes = require('./routes/noteRoutes');
app.use('/notes', noteRoutes);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' });
});

// Error Handler
app.use(errorHandler);

module.exports = app;
