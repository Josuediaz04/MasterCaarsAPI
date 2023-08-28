const Joi = require('joi');

const email = Joi.string();
const password = Joi.string();
const oldPassword = Joi.string();

const login = Joi.object({
    email: email.required(),
    password: password.required()
});

const recovery = Joi.object({
    email: email.required()
});

const recoveryPasword = Joi.object({
    password: password.required()
});

module.exports = {
    login,
    recovery,
    recoveryPasword
}