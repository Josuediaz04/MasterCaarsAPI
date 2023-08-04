const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../../../config/index');

const jsonwebtoken = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JwtSecret
}, async(payload, done) => {
    if (!payload) {
        return done('no token provided', null);
    }
    return done(null, payload);
});

module.exports = jsonwebtoken;
