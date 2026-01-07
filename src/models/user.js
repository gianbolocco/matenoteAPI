const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: false
    },
    plan: {
        type: String,
        default: 'Free'
    },
    provider: {
        type: String,
        default: 'local'
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    interests: {
        type: [String],
        required: false
    },
    country: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    usagePurpose: {
        type: String,
        required: false
    }
});

// Transform output to include id instead of _id
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('User', userSchema);