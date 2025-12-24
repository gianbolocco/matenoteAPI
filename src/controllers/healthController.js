const getHealth = (req, res, next) => {
    try {
        res.status(200).json({
            status: 'UP',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHealth,
};
