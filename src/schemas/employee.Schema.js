 const Joi = require('joi')

const id = Joi.number().integer();
const dui = Joi.string();
const direction = Joi.string();
const phone = Joi.number();
const idUser = Joi.number().integer();
const idJob = Joi.number().integer();
const imageUrl = Joi.binary()
const post = Joi.string()

const createEmployee = Joi.object({
    idJob: idJob.required(),
    post: post,
    dui: dui,
    direction: direction,
    phone: phone,
    idUser: idUser.required(),
    imageUrl: imageUrl
})


const updateEmployee = Joi.object({
    idJob,
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