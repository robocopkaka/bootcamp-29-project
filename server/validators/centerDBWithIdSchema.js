import Joi from 'joi';

const centerDBWithIdSchema = {
  body: {
    name: Joi.string().required(),
    capacity: Joi.number().required().min(1),
    detail: Joi.string().required(),
    image: Joi.string(),
    state: Joi.string().required(),
    chairs: Joi.number().min(1),
    projector: Joi.number().min(1),
    address: Joi.string().required()
  },
  params: {
    centerId: Joi.number().required().min(1)
  }
};

module.exports = centerDBWithIdSchema;
