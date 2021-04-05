const { body, validationResult } = require('express-validator');
const lod = require('lodash');
const Match = require('../models/Match');
const ObjectID = require('mongodb').ObjectID;

const show_home = (req, res) => {
    res.render("home", {title:"Home"});
};

const show_matches = (req, res) =>{
    Match.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
};


// {"_id":"0d8fa4ae8adfb92e4d94d462","referee":"Lindsay Rose","matchTime":"1996-04-18T03:49:55.000Z",
// "teams":{"_id":"606b294e3e1e12e4b8e01e4e","home":"Johnson-Tapia","away":"Werner PLC"},
// "stadium":{"_id":"606b294e3e1e12e4b8e01e4f","name":"Jamesland 2","width":3,"length":2},
// "linemen":{"_id":"606b294e3e1e12e4b8e01e50","first":"Maria Moody","second":"Michelle Johnson"},
// "managerScheduled":"ac8f833313ffcdd8628824a6",
// "reservations":[{"user_id":"c77c9cdf10ac9788300bee23","x_i":0,"y_i":1},{"user_id":"c9f3417f09177e45bcc5a617","x_i":1,"y_i":1},{"user_id":"ddb15b991f0b70b3a7181977","x_i":2,"y_i":0}]
// }

const add_match = (req, res) =>{
    const linemen_i = {
        first: "line",
        second:"man"
    };
    const team_i = {
        home: "team_home",
        away: "team_away"
    };
    var objectId = new ObjectID();
    const reservations_i={
        user_id: objectId,
        x_i: 10,
        y_i:10
    };
    const stadium_i = {
        name: "stad_x",
        width:10,
        length: 20
    };
    var objectId2 = new ObjectID();
    const match_i = new Match({
        referee:"Ev",
        linemen:linemen_i,
        matchTime:"1996-04-18T05:49:55.000000",
        managerScheduled: objectId2,
        teams: team_i,
        stadium: stadium_i,
        reservations:[reservations_i]
    });

    match_i.save()
        .then((result)=>{
            console.log("4");
            res.send(result);
        })
        .catch((err)=>{
            console.log("5");
            console.log(err);
        });
};

module.exports = {
    show_home,
    add_match,
    show_matches
};