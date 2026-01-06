const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/userRepository");

class AuthService {
    static async loginWithGoogle(profile) {
        const email = profile.emails[0].value;
        const name = profile.displayName;

        let user = await UserRepository.findByEmail(email);

        if (!user) {
            user = await UserRepository.create({
                email,
                name,
                lastName: profile.name?.familyName || 'Unknown', // Handle lastName requirement if needed
                provider: "google",
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
