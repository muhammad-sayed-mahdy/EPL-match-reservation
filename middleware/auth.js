const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../models/User');

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
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

module.exports = {
    requireAuth
};