const passport = require('passport');
const userService = require('../Users/user.service');
const { Strategy, ExtractJwt } = require('passport-jwt');

passport.use(new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        async function(token,done) {
            try {
                const user = await userService.getUser({_id: token.sub})
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (err) {
                if (err) {
                    return done(err);
                }
            }
        }
    )
);