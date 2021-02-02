const { body, validationResult } = require('express-validator');
const lod = require('lodash');
const Team = require('../models/Team');

const verifyAddTeam = () => {
    return [
        body('name').notEmpty().withMessage('Name is required').bail()
        .custom(async (val) => {
            const team = await Team.findOne({name: val});
            if (!team) {
                return true;
            }
            throw new Error("Name already in use");
        })
    ];
};

const addTeam_post = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        res.status(400).json({errors: errors.array()});
        return;
    }
    const data = lod.pick(req.body, ['name']);
    Team.create(data).then( 
        res.status(200).send(data)
        ).catch(error => {
        res.json(error);
    });
};

const verifyDltTeam = () => {
    return [
        body('name').notEmpty().withMessage('Name is required').bail()
        .custom(async (val) => {
            const team = await Team.findOne({name: val});
            if (team) {
                return true;
            }
            throw new Error("Name does not exists");
        })
    ];
};

const dltTeam_delete = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        res.status(400).json({errors: errors.array()});
        return;
    }
    const data = lod.pick(req.body, ['name']);


    await Team.deleteOne({name:data.name},function(err)
    {
        if(err)
        {
            res.status(400).json({"Error":"Something Went Wrong"});
            return;
        }
    });
    res.status(200).json("deleted Sucessfully")

};

module.exports = {
    verifyAddTeam,
    verifyDltTeam,
    addTeam_post,
    dltTeam_delete
};