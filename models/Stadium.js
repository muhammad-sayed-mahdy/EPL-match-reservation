const mongoose = require('mongoose');

const stadiumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    width: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    }
});

const Stadium = mongoose.model('Stadium', stadiumSchema);
module.exports = Stadium