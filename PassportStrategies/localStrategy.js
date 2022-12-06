const passport = require("passport");
const LocalStrategy = require("passport-local");
const userService = require("../Users/user.service")
passport.use(new LocalStrategy({usernameField :'name'},
    async function(username,password,done){
        try{
            const user = await userService.checkPassword(username,password)
            if(!user){return done(null,false);}
            return done(null,user);
        }catch(err){
            if(err){return done(err);}
        }
    }
));

