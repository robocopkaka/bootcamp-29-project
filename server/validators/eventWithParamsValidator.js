import Joi from 'joi';

const eventWithParamsSchema = {
  params: {
    centerId: Joi.number().required()
  }
};

module.exports = eventWithParamsSchema;
