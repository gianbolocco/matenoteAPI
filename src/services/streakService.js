const userRepository = require('../repositories/userRepository');
const { ValidationError, NotFoundError } = require('../utils/customErrors');

class StreakService {

    /**
     * Checks if the user's streak is broken based on the last activity date.
     * If broken, resets the current streak to 0 in the database and returns the updated user.
     * @param {Object} user - The user object
     * @returns {Object} - The updated user object with correct streak status
     */
    async checkStreakStatus(user) {
        if (!user.streak || !user.streak.lastActivityDate || user.streak.current === 0) {
            return user;
        }

        const now = new Date();
        const lastActivityDate = new Date(user.streak.lastActivityDate);

        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const lastDate = new Date(lastActivityDate.getFullYear(), lastActivityDate.getMonth(), lastActivityDate.getDate());

        const diffTime = Math.abs(today - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 1) {
            // Streak broken
            const streakUpdate = {
                streak: {
                    ...user.streak,
                    current: 0
                    // Do NOT update lastActivityDate, so subsequent logic knows when the last actual activity was
                }
            };

            await userRepository.update(user._id || user.id, streakUpdate);

            // Update local user object to return
            if (user.streak) {
                user.streak.current = 0;
            }
        }
        return user;
    }

    /**
     * Updates the user's streak when an activity is performed.
     * @param {Object} user - The user object
     * @returns {Object} - The updated user object
     */
    async updateStreak(user) {
        if (!user) {
            throw new ValidationError('User is required for streak update');
        }

        const now = new Date();
        const lastActivityDate = user.streak && user.streak.lastActivityDate ? new Date(user.streak.lastActivityDate) : null;

        let newCurrentStreak = user.streak ? user.streak.current : 0;
        let newLongestStreak = user.streak ? user.streak.longest : 0;
        let alreadyCompletedToday = false;

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
            } else if (diffDays === 0) {
                // Same day, streak already completed
                alreadyCompletedToday = true;
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

        const updatedUser = await userRepository.update(user._id || user.id, streakUpdate);

        // Calculate timing details
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        let nextAvailableAt = now;

        if (alreadyCompletedToday) {
            nextAvailableAt = tomorrow;
        }

        return {
            user: updatedUser,
            status: {
                alreadyCompletedToday,
                nextAvailableAt
            }
        };
    }
}

module.exports = new StreakService();
