const userRepository = require('../repositories/userRepository');
const { NotFoundError, ValidationError } = require('../utils/customErrors');

class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        return user;
    }

    async createUser(userData) {
        const { name, email } = userData;
        if (!name || !email) {
            throw new ValidationError('Name and email are required');
        }
        return await userRepository.create({ name, email });
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
}

module.exports = new UserService();
