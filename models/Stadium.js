const mongoose = require('mongoose');

const stadiumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    widht: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    }
});

const Stadium = mongoose.model('Stadium', stadiumSchema);
module.exports = {Stadium, stadiumSchema};