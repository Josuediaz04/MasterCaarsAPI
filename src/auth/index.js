const passport = require('passport');
const { jsonwebtoken, loginJWT, recoveryJwt } = require('./strategies/jwt.strategy');
const localStrategy = require('./strategies/local.strategy');

passport.use(localStrategy);
passport.use('jwtLogin', loginJWT);
passport.use('jwtRecovery', recoveryJwt);
passport.use(jsonwebtoken);