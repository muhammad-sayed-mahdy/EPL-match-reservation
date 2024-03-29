const { body, validationResult } = require('express-validator');
const lo = require('lodash');
const User = require('../models/User');
const Match = require('../models/Match');

const verifyUpdate = () => {
    return [
        body('oldPassword').if(body('newPassword').exists())
        .notEmpty().withMessage("You should enter the old password").bail()
        .custom(async (val, {req}) => {
            const user = await User.findById(req.user.id, '+password');
            req.user = user;
            if (!(await user.isValidPassword(val))) {
                throw new Error("The old password is incorrect");
            }
            return true;
        }),

        body('newPassword').optional().isString().withMessage("Password should be a string").bail()
        .isLength({min: 8}).withMessage("Password should have minimum length of 8").bail()
        .custom( (val, {req}) => {
            if (val === req.body.oldPassword) {
                throw new Error("The new password cannot be the same as the old password");
            }
            return true;
        }),

        body('passwordConfirmation').if(body('newPassword').exists())
        .notEmpty().withMessage("Password confirmation is required").bail()
        .custom((val, {req}) => {
            if (val !== req.body.newPassword) {
                throw new Error("The new password confirmation doesn't match");
            }
            return true;
        }),

        body('fname').optional().isAlpha().withMessage("First name should constain only letters"),

        body('lname').optional().isAlpha().withMessage("Last name should contain only letters"),

        body('city').optional().isString().withMessage("City should be a string"),

        body('gender').optional().toUpperCase().isIn(['F', 'M']).withMessage("Gender should be either `F` or `M"),

        body('bdate').optional().isDate().withMessage('Birth date should be a valid date following "yyyy/mm/dd" format')
    ];
};

const update = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    data = lo.pick(req.body, ['fname', 'lname', 'city', 'gender', 'bdate']);
    if (req.body.newPassword) {
        data.password = req.body.newPassword;
    }

    req.user.updateOne(data, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json({updated: data, id: req.user.id});
    });
};

const view_profile = (req, res) =>{
    //sure not a guest
    if (req.user.role == "admin")
        res.redirect("/admin");

    else if (req.user.role == "manager")
        res.render("user_profile", {title:"Profile"});
    else
        res.render("user_profile", {title:"Profile"});
    
};

const view = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        res.render('users/view', { title: user.fname, user });
    })
    .catch( err => {
        res.status(404).render('404', {title: "Not found"});
    });
};

const edit = (req, res) => {
    res.render('users/edit', {title: 'Update Profile', user: req.user});
};

const reservations = async(req, res)=>{
    var userId = req.user._id;
    if(userId ==undefined)
    {
        res.status(400).json({"Error":"userId is required" });
        return;
    }

    match = await Match.find({"reservations.user_id": userId}).select("reservations");
    for(i =0;i<match.length;i++)
    {
        for(j=0;j<match[i].reservations.length;j++)
        {
            if(String(match[i].reservations[j].user_id) != String(userId))
            {
                match[i].reservations.splice(j, 1); 
                j--;
            }
                
        }       
    }
    if (match) {
        // res.status(200).json({"reservedSeats":match});
        res.render("users/reservations", {title:"Show", matches:match});
        return;
    }
    res.status(400).json({"Error":"id does not exist"});
};

module.exports = {
    verifyUpdate,
    update,
    view_profile,
    view,
    edit,
    reservations
};