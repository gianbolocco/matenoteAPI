require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

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
