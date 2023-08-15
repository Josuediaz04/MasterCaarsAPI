const passport = require('passport');
const { jsonwebtoken, loginJWT } = require('./strategies/jwt.strategy');
const localStrategy = require('./strategies/local.strategy');

passport.use(localStrategy);
passport.use('jwtLogin', loginJWT);
passport.use(jsonwebtoken);