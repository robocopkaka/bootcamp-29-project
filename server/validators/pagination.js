import Joi from 'joi';

const eventsInCenterSchema = {
  query: {
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1)
  }
};

module.exports = eventsInCenterSchema;
