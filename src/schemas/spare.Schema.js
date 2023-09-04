const Joi = require('joi')

const id = Joi.number().integer();
const articleSpare = Joi.string();
const description = Joi.string();
const price = Joi.number().precision(2);
const amount = Joi.number().integer();
const brandSpare = Joi.string();
const origin = Joi.string();

const createSpare = Joi.object({
    articleSpare: articleSpare.required(),
    description: description.required(),
    price: price.required(),
    amount: amount.required(),
    brandSpare: brandSpare.required(),
    origin: origin.required(),
});

const updateSpare = Joi.object({
    articleSpare,
    description,
    price,
    amount,
    brandSpare,
    origin
})

const getSpare = Joi.object({
    id : id.required()  
})

module.exports = {
    createSpare ,
    updateSpare,
    getSpare
}