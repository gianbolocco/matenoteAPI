require('dotenv').config();
const app = require('./app');

const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`
    ################################################
    🛡️  Server listening on port: ${PORT} 🛡️
    ################################################
    ➜  API Docs: http://localhost:${PORT}/api-docs
    ➜  Health:   http://localhost:${PORT}/health
    ################################################
    `);
    });
});
