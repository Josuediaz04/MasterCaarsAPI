const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const lastname = Joi.string().min(3);
const password = Joi.string().min(5).max(15);
const email = Joi.string().min(5);
const idRole = Joi.number().integer();
const status = Joi.boolean();

const createUser = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    password: password.required(),
    email: email.required(),
    idRole: idRole.required(),
    status
});

const updateUser = Joi.object({
    name,
    lastname,
    password,
    email,
    idRole,
    status
});

const getUser = Joi.object({
    id: id.required()
});

module.exports = {
    createUser,
    updateUser,
    getUser
}
