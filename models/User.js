const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require("bcrypt");

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
        // select: false
    },
    role: {
        type: String,
        required: true,
        default: 'fan',
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

}, {timestamps: true});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.isValidPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;