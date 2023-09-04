const Joi = require('joi')

const id = Joi.number().integer();
const article_spare = Joi.string();
const description = Joi.string();
const price = Joi.number().precision(2);
const amount = Joi.number.integer();
const brand_spare = Joi.string();

const createSpare = Joi.object({
    article_spare: article_spare.required(),
    description: description.required(),
    price: price.required(),
    amount: amount.required(),
    brand_spare: brand_spare.required()
});

const updateSpare = Joi.object({
    article_spare,
    description,
    price,
    amount,
    brand_spare
})

const getSpare = Joi.object({
    id : id.required()  
})

module.exports = {
    createSpare ,
    updateSpare,
    getSpare
}