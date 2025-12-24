class User {
    constructor(name, lastName, phoneNumber, email, password) {
        this.id = null;
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password; // In a real app, hash this!
    }
}

module.exports = User;