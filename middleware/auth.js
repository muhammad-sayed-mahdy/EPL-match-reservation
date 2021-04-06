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

const requireAuth = (req, res, next) => { 
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) {
            res.status(401).json({error: err});
            return;
        }
        if (!user) {
            res.status(401).json({error: "The JWT token is invalid"});
            return;
        }
        req.user = user;
        next();
    })(req, res, next);
};

// expecting a user to enter this route, if no user redirect to login
// (used in get requests)
const userRoute = (req, res, next) => { 
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) {
            res.redirect('/login');
            return;
        }
        if (!user) {
            res.redirect('/login');
            return;
        }
        req.user = user;
        next();
    })(req, res, next);
};

// expecting a guest to enter this route, if there is a user redirect to home
// (used in get requests)
const guestRoute = (req, res, next) => { 
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) {
            res.redirect('/');
            return;
        }
        if (user) {
            res.redirect('/');
            return;
        }
        next();
    })(req, res, next);
};

module.exports = {
    requireAuth,
    userRoute,
    guestRoute
};