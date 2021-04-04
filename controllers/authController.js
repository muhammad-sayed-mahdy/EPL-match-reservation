const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const lo = require('lodash');

const User = require('../models/User');

const signup_get = (req, res) => {
    res.render("signup", {title:"Signup"});
};

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, {expiresIn: '1d'});
};

const verifySignup = () => {
    return [
        body('email').notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage("Email is not valid").normalizeEmail().bail()
        .custom(async (val) => {
            const user = await User.findOne({email: val});
            if (user) {
                throw new Error("Email already in use");
            }
            return true;
        }),

        body('password').notEmpty().withMessage("Password is required").bail()
        .isString().withMessage("Password should be a string").bail()
        .isLength({min: 8}).withMessage("Password should have minimum length of 8"),

        body('passwordConfirmation').notEmpty().withMessage("Password Confirmation is required").bail()
        .custom((val, {req}) =>{
            if (val !== req.body.password) {
                throw new Error("Password confirmation doesn't match");
            }
            return true;
        }),

        body('fname').notEmpty().withMessage("First Name is required").bail()
        .isAlpha().withMessage("First name should contain only letters"),

        body('lname').notEmpty().withMessage("Last Name is required").bail()
        .isAlpha().withMessage("Last name should contain only letters"),

        body('city').optional().isString().withMessage("City should be a string"),

        body('gender').optional().toUpperCase().isIn(['M', 'F']).withMessage("Gender should be either `M` or `F`"),

        body('bdate').optional().isDate().withMessage('Birth date should be a valid date following "yyyy/mm/dd" format')
    ];
};

const signup_post = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        res.status(400).json({errors: errors.array()});
        return;
    }
    const data = lo.pick(req.body, ['email', 'password', 'fname', 'lname', 'city', 'gender', 'bdate']);
    User.create(data).then(user => {
        const token = createToken(user.id);
        res.json({id: user.id, token});
    }).catch(error => {
        res.json(error);
    });
};

const me = (req, res) => {
    req.user.__v = undefined;
    res.json({user: req.user});
};

const verifyLogin = () => {
    return [
        body('email').notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage("Email is not valid").normalizeEmail().bail()
        .custom(async (val) => {
            const user = await User.findOne({email: val});
            if (user) {
                return true;
            }
            throw new Error("Email is not found");
        }),

        body('password').notEmpty().withMessage("Password is required")

    ];
};

const login_post = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    try {
        const user = await User.findOne({email: req.body.email}, {email:1, password:1});
        if (await user.isValidPassword(req.body.password)) {
            res.json({id: user.id, token: createToken(user.id)});
        } else {
            res.status(400).json({error: "Incorrect Password"});
        }

    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    signup_get,
    verifySignup,
    signup_post,
    me,
    verifyLogin,
    login_post
};