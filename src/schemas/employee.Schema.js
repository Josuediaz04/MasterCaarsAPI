 const Joi = require('joi')

const id = Joi.number().integer();
const dui = Joi.string();
const direction = Joi.string();
const phone = Joi.number();
const idUser = Joi.number().integer();
const idJob = Joi.number().integer();

const createEmployee = Joi.object({
    idJob: idJob.required(),
    dui,
    direction,
    phone,
    idUser: idUser.required()
})


const updateEmployee = Joi.object({
    idJob,
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