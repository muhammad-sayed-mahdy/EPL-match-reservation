const { body, validationResult } = require('express-validator');
const lod = require('lodash');
const Match = require('../models/Match');
const ObjectID = require('mongodb').ObjectID;

//render home page
const show_home = (req, res) => {
    res.render("home", {title:"Home"});
};

//retrieve all matches
const show_matches = (req, res) =>{
    Match.find().sort({createdAt:-1})
        .then((result)=>{
            res.render("home", {title:"Schedule", matches:result});
        })
        .catch((err)=>{
            console.log(err);
        });
};


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
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
};

module.exports = {
    show_home,
    add_match,
    show_matches
};