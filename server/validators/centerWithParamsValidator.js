import Joi from 'joi';

const centerWithParamsSchema = {
  params: {
    centerId: Joi.number().required()
  }
};

module.exports = centerWithParamsSchema;
