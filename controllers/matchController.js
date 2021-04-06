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
        first: req.body.linemanFirst,
        second:req.body.linemanFirst
    };
    const team_i = {
        home: req.body.homeTeam,
        away: req.body.awayTeam
    };
    
    const stadium_i = {
        name: req.body.stadium,
        width:req.body.stadWidth,
        length:req.body.stadHeight
    };
    var objectId2 = new ObjectID();

    const match_i = new Match({
        referee:req.body.referee,
        linemen:linemen_i,
        matchTime:"1996-04-18T05:49:55.000000",
        managerScheduled: objectId2,
        teams: team_i,
        stadium: stadium_i
    });

    match_i.save()
        .then((result)=>{
            res.redirect("/");
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).render('404',{title:"Error"});
        });
};

const show_match = (req, res) =>{
    const id = req.params.id;
    Match.findById(id)
        .then((result)=>{
            res.render("match", {match:result, title:"Show"});
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).render('404',{title:"Error"});
        });
}
module.exports = {
    show_home,
    add_match,
    show_matches,
    show_match
};