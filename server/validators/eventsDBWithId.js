import Joi from 'joi';

const eventDBWithIdSchema = {
  params: {
    eventId: Joi.number().required()
  }
};

module.exports = eventDBWithIdSchema;
