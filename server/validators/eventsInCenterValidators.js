import Joi from 'joi';

const eventsInCenterSchema = {
  params: {
    centerId: Joi.number().required()
  },
  query: {
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1)
  }
};

module.exports = eventsInCenterSchema;
