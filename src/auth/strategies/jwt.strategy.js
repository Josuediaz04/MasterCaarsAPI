const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../../../config/index');


const jwt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JwtSecret
};

const jsonwebtoken = new Strategy(jwt, async(payload, done) => {
    if (!payload) {
        return done('no token provided', null);
    }
    return done(null, payload);
});


const loginOptions = {
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    secretOrKey: config.JwtLogin
};

const loginJWT = new Strategy(loginOptions, (payload, done) => done(null, payload));

module.exports = {
    jsonwebtoken,
    loginJWT
};
