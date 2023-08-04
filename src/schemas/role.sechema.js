const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string()
const status = Joi.boolean()
const createAt = Joi.date()

const createRole = Joi.object({
    name: name.required(),
    status: status.required(),
    createAt: createAt.required()
})


const updateRole = Joi.object({
    name,
    status,
    createAt
})

const getRole = Joi.object({
    id: id.required()
})

module.exports ={
    createRole,
    updateRole,
    getRole
}