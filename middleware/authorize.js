const User = require('../models/User');


const authorizeAdmin = (req, res, next) => {
    if(req.user.role !== "admin"){
        res.status(402).json({error: "Unauthorized User"});
        return;
    }
    next();
    return;
};

const renderUnauthorized = (req, res, next) => {
    if(req.user.role !== "admin"){
        res.render("unauthorized", {title:"Error"});
        return;
    }
    next();
    return;
};

const authorizeManager= (req, res, next) => {

    if(req.user == undefined || req.user.role !== "manager") 
    {
        // Not even signed in OR signed in but not a manager
        res.status(402).render('404',{title:"Error"});
        return;
    }

    next();
    return;
};


module.exports = { 
    authorizeAdmin,
    authorizeManager,
    renderUnauthorized
};