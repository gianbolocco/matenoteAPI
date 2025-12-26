const User = require('../models/User');

class UserRepository {
    async findAll() {
        return await User.find({});
    }

    async findById(id) {
        return await User.findById(id);
    }

    async create(userData) {
        // userData should match schema structure (name, lastName, phoneNumber, email, password)
        // Adjust if userData structure differs from schema keys
        const newUser = new User(userData);
        return await newUser.save();
    }

    async update(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }

    async delete(id) {
        const result = await User.findByIdAndDelete(id);
        return !!result;
    }
}

module.exports = new UserRepository();
