const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: isEmail,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'manager', 'fan']
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    city: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['M', 'F']
    },
    bdate: {
        type: Date
    }

});

const User = mongoose.model('User', userSchema);
module.exports = User;