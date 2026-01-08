const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./strategies/googleStrategy'); // Register strategy
const errorHandler = require('./middleware/errorHandler');
const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

const app = express();

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL, // Ensure this env var is set
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);
app.use('/health', healthRoutes);
app.use('/users', userRoutes);
const noteRoutes = require('./routes/noteRoutes');
const flashcardRoutes = require('./routes/flashcardRoutes');
const quizRoutes = require('./routes/quizRoutes');
const folderRoutes = require('./routes/folderRoutes');

app.use('/notes', noteRoutes);
app.use('/flashcards', flashcardRoutes);
app.use('/quizzes', quizRoutes);
app.use('/', folderRoutes); // Mounts at root to match /users/:userId/folders and /folders/:id

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' });
});

// Error Handler
app.use(errorHandler);

module.exports = app;
