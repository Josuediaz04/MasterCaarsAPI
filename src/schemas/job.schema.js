const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string()
const status = Joi.boolean()

const createJob = Joi.object({
    name: name.required(),
    status
})


const updateJob = Joi.object({
    name,
    status,
})

const getJob = Joi.object({
    id: id.required()
})

module.exports ={
    createJob,
    updateJob,
    getJob
}