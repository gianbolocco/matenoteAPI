const userRepository = require('../repositories/userRepository');
const { NotFoundError, ValidationError } = require('../utils/customErrors');
const streakService = require('./streakService');

class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }

    async getUserById(id) {
        let user = await userRepository.findById(id);
        if (!user) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        user = await streakService.checkStreakStatus(user);
        return user;
    }

    async createUser(userData) {
        return await userRepository.create(userData);
    }

    async updateUser(id, userData) {
        const updatedUser = await userRepository.update(id, userData);
        if (!updatedUser) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        return updatedUser;
    }

    async deleteUser(id) {
        const deleted = await userRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        return { message: 'User deleted successfully' };
    }

    async findByEmail(email) {
        return await userRepository.findByEmail(email);
    }

    async updateStreak(userId) {

        if (!userId) {
            throw new ValidationError('User ID is required');
        }

        const user = await userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError(`User with ID ${userId} not found`);
        }

        return await streakService.updateStreak(user);
    }
}

module.exports = new UserService();
