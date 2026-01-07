const { AuthService } = require("../services/AuthService.js");

const googleCallback = async (req, res, next) => {
    try {
        const profile = req.user;

        const { token } = await AuthService.loginWithGoogle(profile);

        res.cookie("auth", token, {
            httpOnly: true,
            secure: false, //TODO true en prod
            sameSite: "lax",
        });

        res.redirect(`${process.env.FRONTEND_URL}/home`);
    } catch (error) {
        next(error);
    }
};

const getSession = (req, res) => {
    res.json({
        user: req.user,
    });
};

const logout = (req, res, next) => {
    try {
        res.clearCookie("auth", {
            httpOnly: true,
            secure: false, //TODO true en prod, must match the options used when setting the cookie
            sameSite: "lax",
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = { googleCallback, getSession, logout };
