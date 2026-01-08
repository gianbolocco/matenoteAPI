const { Router } = require("express");
const passport = require("passport");
const { googleCallback, getSession, logout } = require("../controllers/authController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = Router();

// inicia OAuth
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}/login?error=google`,
    }),
    googleCallback
);

router.get("/session", authMiddleware, getSession);
router.post("/logout", logout);

module.exports = router;
