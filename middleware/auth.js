const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const User = require('../models/User');


const tokenExtractor = (req) => {
    if (req) {
        if (req.cookies && req.cookies.token)
            return req.cookies.token;
        if (req.headers && req.headers.authorization)
            return req.headers.authorization.split(" ")[1];
    }
    return null;
};

passport.use(new JWTStrategy({
    jwtFromRequest: tokenExtractor,
    secretOrKey: process.env.SECRET
},
    function (jwtPayload, done) {
        return User.findById(jwtPayload.id)
            .then(user => {
                return done(null, user);
            }
            ).catch(err => {
                return done(err);
            });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) =>{
        done(err, user);
    });
});

const checkUser = (req, res, next) => { 
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) {
            console.log(err);
            res.redirect('/');
            return;
        }
        req.user = user;
        res.locals.loggedInUser = user;
        next();
    })(req, res, next);
};

const requireAuth = (req, res, next) => { 
    if (!req.user) {
        res.status(401).json({error: "The JWT token is invalid"});
    } else if (!req.user.authorized) {
        res.status(401).json({error: "Unauthorized"});
    } else {
        next();
    }
};

// expecting a user to enter this route, if no user redirect to login
// (used in get requests)
const userRoute = (req, res, next) => { 
    if (!req.user) {
        res.redirect('/login');
    } else if (!req.user.authorized) {
        res.status(401).render('unauthorized', {title: "Unauthorized"});
    } else {
        next();
    }
};

// expecting a guest to enter this route, if there is a user redirect to home
// (used in get requests)
const guestRoute = (req, res, next) => { 
    if (req.user) {
        res.redirect('/');
        return;
    }
    next();
};

module.exports = {
    requireAuth,
    userRoute,
    guestRoute,
    checkUser
};