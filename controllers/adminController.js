const { body, validationResult } = require('express-validator');
const { result } = require('lodash');
const lod = require('lodash');

const User = require("../models/User");


const verifySearch = () => {
    return [
        body('email').notEmpty().withMessage('Email is required').bail()
    ];
};

const verify_id = () => {
    return [
        body('_id').notEmpty().withMessage('User _id is required').bail()
        .custom(async (val) => {
            const user = await User.findById(val);
            if (user) {
                return true;
            }
            throw new Error("Not Valid User _id");
        })
    ];
};

const getAllUsers = (req, res) => {
    try {
        User.find().then( (result) => {
            // res.status(200).json(result);
            if(req.user == undefined)
                user_name = "Evram";
            else
                user_name = req.user.name;
            res.render("admin_profile", {match:result, title:"Profile", users:result, user_name:user_name});
        });
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};

const searchUsers = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    const val = req.body.email;
    try {
        User.find({email: {$regex: val}}).then( (result) => {
            res.status(200).json(result);
        });
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};


const approveUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    const val = req.body._id;
    try {
        User.updateOne({_id: val}, {role: "manager"}).then( (result) => {
            res.status(200).json(result);
        });
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};



const deleteUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    const val = req.body._id;
    try {
        User.deleteOne({_id: val}).then( (result) => {
            res.status(200).json(result);
        });
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
};


module.exports = {
    getAllUsers, verifySearch, searchUsers, verify_id, approveUser, deleteUser
};