const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string()
const status = Joi.boolean()

const createRole = Joi.object({
    name: name.required(),
    status
})


const updateRole = Joi.object({
    name,
    status,
})

const getRole = Joi.object({
    id: id.required()
})

module.exports ={
    createRole,
    updateRole,
    getRole
}