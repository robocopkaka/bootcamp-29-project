import Joi from 'joi';

const eventWithParamsSchema = {
  params: {
    eventId: Joi.number().required()
  }
};

module.exports = eventWithParamsSchema;
