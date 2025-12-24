const User = require('../models/User');

let users = [];
let nextId = 1;

class UserRepository {
    async findAll() {
        return users;
    }

    async findById(id) {
        return users.find(u => u.id === id);
    }

    async create(userData) {
        const newUser = new User(userData.name, userData.lastName, userData.phoneNumber, userData.email, userData.password);
        newUser.id = nextId++;
        users.push(newUser);
        return newUser;
    }

    async update(id, userData) {
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return null;

        const currentUser = users[index];
        const mergedData = { ...currentUser, ...userData };

        const updatedUser = new User(
            mergedData.name,
            mergedData.lastName,
            mergedData.phoneNumber,
            mergedData.email,
            mergedData.password
        );
        updatedUser.id = id; // Preserve ID
        users[index] = updatedUser;
        return users[index];
    }

    async delete(id) {
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return false;

        users.splice(index, 1);
        return true;
    }
}

module.exports = new UserRepository();
