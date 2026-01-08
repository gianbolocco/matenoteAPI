const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/userRepository");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.auth;

        if (!token) {
            return res.status(401).json({ message: "No authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserRepository.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalid" });
    }
};

module.exports = authMiddleware;
