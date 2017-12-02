import Joi from 'joi';

const eventDBSchema = {
  body: {
    name: Joi.string().required(),
    date: Joi.string().required(),
    centerId: Joi.number().required(),
    categoryId: Joi.number().required()
  }
};

module.exports = eventDBSchema;
