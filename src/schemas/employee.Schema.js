 const Joi = require('joi')

const id = Joi.number().integer();
const post = Joi.string();
const dui = Joi.string();
const direction = Joi.string();
const phone = Joi.number();
const idUser = Joi.number().integer();
const imageUrl = Joi.binary()

const createEmployee = Joi.object({
    post: post.required(),
    dui: dui.required(),
    direction: direction.required(),
    phone: phone.required(),
    idUser: idUser.required(),
    imageUrl: imageUrl.required()
})


const updateEmployee = Joi.object({
    post,
    dui,
    direction,
    phone,
    idUser,
    imageUrl
})

const getEmployee = Joi.object({
    id: id.required()
})

module.exports ={
    createEmployee,
    updateEmployee,
    getEmployee
}