const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./strategies/google.strategy'); // Register strategy
const errorHandler = require('./middleware/errorHandler');
const healthRoutes = require('./routes/HealthRoutes');
const userRoutes = require('./routes/UserRoutes');
const authRoutes = require('./routes/AuthRoutes');
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
const noteRoutes = require('./routes/NoteRoutes');
const flashcardRoutes = require('./routes/FlashcardRoutes');
const quizRoutes = require('./routes/QuizRoutes');
const folderRoutes = require('./routes/FolderRoutes');

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
