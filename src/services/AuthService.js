const jwt = require("jsonwebtoken");
const UserService = require("./UserService");

class AuthService {
    static async loginWithGoogle(profile) {
        const email = profile.emails[0].value;
        const name = profile.displayName;

        let user = await UserService.findByEmail(email);

        if (!user) {
            user = await UserService.createUser({
                email,
                name,
                avatar: profile.photos[0].value,
                lastName: profile.name?.familyName || 'Unknown', // Handle lastName requirement if needed
                provider: "google",
                plan: "Free",
            });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return { token, user };
    }
}

module.exports = { AuthService };
