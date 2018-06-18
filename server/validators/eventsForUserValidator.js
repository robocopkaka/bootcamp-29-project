import Joi from 'joi';

const eventsForUserSchema = {
  params: {
    userId: Joi.number().required()
  },
  query: {
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1)
  }
};

module.exports = eventsForUserSchema;
