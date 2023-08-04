const boom = require('@hapi/boom');
const { Strategy } = require('passport-local');
const AuthService = require('../../services/auth.service');
const bcrypt = require('bcrypt');

const service = new AuthService;

const localStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = await service.readByEmail(email);
    if (!user) {
        return done(boom.unauthorized('Email not found'), null);
    }
    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) {
        return done(boom.unauthorized('Incorrect password'),null);
    }
    delete user.dataValues.password;
    return done(null, user);
});

module.exports = localStrategy;
