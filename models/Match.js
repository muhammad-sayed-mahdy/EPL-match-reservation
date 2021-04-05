const mongoose = require('mongoose');
// const { teamSchema } = require('./Team');
// const { stadiumSchema } = require('./Stadium');

const teamsSchema = new mongoose.Schema({
    home: {
        type: String,
        required: true
    },
    away: {
        type: String,
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
        required: false
    }
});

const reservationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.ObjectId,
        required: true
    },
    x_i: {
        type: Number,
        required: true
    },
    y_i: {
        type: Number,
        required: true
    }
});

const stadiaSchena = new mongoose.Schema({
    name: {
        type: String,
        required: true
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

const matchSchema = new mongoose.Schema({
    referee: {
        type: String,
        required: true
    },
    matchTime: {
        type: Date,
        required: true
    },
    linemen: {
        // it should be array of linemen!
        type: linemenSchema,
        unique:true
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
        type: stadiaSchena,
        required: true
    },
    reservations: {
        type: [reservationSchema]
        
    }
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;