import Joi from 'joi';

const eventDBSchema = {
  body: {
    name: Joi.string().required(),
    detail: Joi.string().required(),
    date: Joi.string().required(),
    guests: Joi.number().required(),
    centerId: Joi.number().required(),
    categoryId: Joi.number().required()
  }
};

module.exports = eventDBSchema;
