 const Joi = require('joi')

const id = Joi.number().integer();
const post = Joi.string();
const dui = Joi.string();
const direction = Joi.string();
const phone = Joi.number();
const idUser = Joi.number().integer();

const createEmployee = Joi.object({
    post: post.required(),
    dui: dui.required(),
    direction: direction.required(),
    phone: phone.required(),
    idUser: idUser.required()
})


const updateEmployee = Joi.object({
    post,
    dui,
    direction,
    phone,
    idUser
})

const getEmployee = Joi.object({
    id: id.required()
})

module.exports ={
    createEmployee,
    updateEmployee,
    getEmployee
}