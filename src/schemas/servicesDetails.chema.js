const Joi = require('joi')

const id = Joi.number().integer();
const quantity = Joi.number().integer();
const details = Joi.string();
const customer = Joi.string();
const dateDelivery = Joi.date();
const amountService = Joi.number().precision(2);
const amountSpare = Joi.number().precision(2);
const discount = Joi.number().precision(2);
const total = Joi.number().precision(2);
const idService = Joi.number().integer();
const idUser = Joi.number().integer();
const idEmployee = Joi.number().integer();
const idSpare = Joi.number().integer();
const status = Joi.boolean();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createServiceDetails = Joi.object({
    amountService: amountService.required(),
    idService: idService.required(),
    idEmployee: idEmployee.required(),
    idUser: idUser.required(),
    total: total.required(),
    status,
    quantity,
    customer,
    amountSpare,
    discount,
    idSpare,
    details,
    dateDelivery,
});

const queryDetailschema = Joi.object({
    offset,
    status,
    limit: Joi.when('offset', {
      is: Joi.exist(),
      then: limit.required(),
    })
  });


const updateServiceDetails = Joi.object({
    details,
    dateDelivery,
    idService,
    status,
    quantity,
    customer,
    amountSpare,
    amountService,
    discount,
    total,
    idSpare,
})

const getServiceDetails = Joi.object({
    id: id.required()
})

module.exports ={
    createServiceDetails,
    updateServiceDetails,
    getServiceDetails,
    queryDetailschema
}