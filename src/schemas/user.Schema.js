const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const lastname = Joi.string().min(3);
const password = Joi.string().min(5).max(15);
const email = Joi.string().min(5);
const idRole = Joi.number().integer();

const createUser = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    password: password.required(),
    email: email.required(),
    idRole: idRole.required()
});

const update = Joi.object({
    name,
    lastname,
    password,
    email,
    idRole
});

const getUser = Joi.object({
    id: id.required()
});

module.exports = {
    createUser,
    update,
    getUser
}
