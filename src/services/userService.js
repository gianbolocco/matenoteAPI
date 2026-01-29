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

        const now = new Date();
        const lastActivityDate = user.streak && user.streak.lastActivityDate ? new Date(user.streak.lastActivityDate) : null;

        let newCurrentStreak = user.streak ? user.streak.current : 0;
        let newLongestStreak = user.streak ? user.streak.longest : 0;

        // If never active, init streak
        if (!lastActivityDate) {
            newCurrentStreak = 1;
            newLongestStreak = 1;
        } else {
            // Calculate difference in days (ignoring time)
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const lastDate = new Date(lastActivityDate.getFullYear(), lastActivityDate.getMonth(), lastActivityDate.getDate());

            const diffTime = Math.abs(today - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Consecutive day
                newCurrentStreak += 1;
            } else if (diffDays > 1) {
                // Streak broken
                newCurrentStreak = 1;
            }
            // If diffDays === 0, same day, do nothing (keep current streak)
        }

        if (newCurrentStreak > newLongestStreak) {
            newLongestStreak = newCurrentStreak;
        }

        const streakUpdate = {
            streak: {
                current: newCurrentStreak,
                longest: newLongestStreak,
                lastActivityDate: now
            }
        };

        return await userRepository.update(userId, streakUpdate);
    }
}

module.exports = new UserService();
