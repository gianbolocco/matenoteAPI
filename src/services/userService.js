const userRepository = require('../repositories/UserRepository');
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
}

module.exports = new UserService();
