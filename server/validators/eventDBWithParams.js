import Joi from 'joi';

const eventDBWithParamsSchema = {
  body: {
    name: Joi.string().required(),
    detail: Joi.string().required(),
    date: Joi.string().required(),
    guests: Joi.number().required(),
    categoryId: Joi.number().required(),
    centerId: Joi.number().required()
  },
  params: {
    eventId: Joi.number().required()
  }
};

module.exports = eventDBWithParamsSchema;
