import Joi from 'joi';

const eventDBWithParamsSchema = {
  body: {
    name: Joi.string().required(),
    date: Joi.string().required(),
    categoryId: Joi.number().required()
  },
  params: {
    eventId: Joi.number().required()
  }
};

module.exports = eventDBWithParamsSchema;
