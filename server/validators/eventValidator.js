import Joi from 'joi';

const eventSchema = {
  body: {
    name: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
    centerId: Joi.string().required()
  }
};

module.exports = eventSchema;
