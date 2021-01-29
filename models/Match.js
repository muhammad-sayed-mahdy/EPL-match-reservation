const mongoose = require('mongoose');
const { teamSchema } = require('./Team');
const { stadiumSchema } = require('./Stadium');

const teamsSchema = new mongoose.Schema({
    home: {
        type: teamSchema,
        required: true
    },
    away: {
        type: teamSchema,
        required: true
    }
});

const linemenSchema = new mongoose.Schema({
    first: {
        type: String,
        required: true
    },
    second: {
        type: String,
        required: true
    }
});

const reservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    }
});

const matchSchema = new mongoose.Schema({
    referee: {
        type: String
    },
    linemen: {
        type: linemenSchema
    },
    matchTime: {
        type: Date,
        required: true
    },
    managerScheduled: {
        type: mongoose.ObjectId,
        required: true
    },
    teams: {
        type: teamsSchema,
        required: true
    },
    stadium: {
        type: stadiumSchema,
        required: true
    },
    reservations: {
        type: [reservationSchema]
    }
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;