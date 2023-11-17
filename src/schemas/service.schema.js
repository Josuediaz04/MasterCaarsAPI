const Joi = require('joi')

const id = Joi.number().integer();
const typeService = Joi.string();
const description = Joi.string();
const imgUrl = Joi.binary();
const price = Joi.number().integer();
const status = Joi.boolean();

const createService = Joi.object({
    typeService: typeService.required(),
    description: description.required(),
    price: price.required(),
    imgUrl: imgUrl,
    status
})


const updateService = Joi.object({
    typeService,
    description,
    price,
    imgUrl,
    status,
})

const getService = Joi.object({
    id: id.required()
})

module.exports ={
    createService,
    updateService,
    getService
}