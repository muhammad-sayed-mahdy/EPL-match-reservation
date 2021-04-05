const User = require('../models/User');


const authorizeAdmin = (req, res, next) => {
    if(req.user.role !== "admin"){
        res.status(402).json({error: "Unauthorized User"});
        return;
    }
    next();
    return;
};


module.exports = { authorizeAdmin };