const Joi = require('joi')

const id = Joi.number().integer();
const details = Joi.string();
const dateDelivery = Joi.date();
const amount = Joi.number().integer();
const idService = Joi.number().integer();
const idUser = Joi.number().integer();
const status = Joi.boolean();

const createServiceDetails = Joi.object({
    details: details,
    dateDelivery: dateDelivery,
    amount: amount.required(),
    idService: idService.required(),
    idUser: idUser.required(),
    status
})


const updateServiceDetails = Joi.object({
    details,
    dateDelivery,
    amount,
    idService,
    status
})

const getServiceDetails = Joi.object({
    id: id.required()
})

module.exports ={
    createServiceDetails,
    updateServiceDetails,
    getServiceDetails
}