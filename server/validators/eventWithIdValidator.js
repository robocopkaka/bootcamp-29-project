import Joi from 'joi';

const eventWithIdSchema = {
  body: {
    name: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
    centerId: Joi.string().required()
  },
  params: {
    eventId: Joi.number().required()
  }
};

module.exports = eventWithIdSchema;
