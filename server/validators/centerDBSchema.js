import Joi from 'joi';

const centerDBSchema = {
  body: {
    name: Joi.string().required(),
    detail: Joi.string().required(),
    image: Joi.string(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    chairs: Joi.number(),
    projector: Joi.number(),
    capacity: Joi.number().required()
  }
  // params: {
  //   centerId: Joi.string().required()
  // }
};

module.exports = centerDBSchema;
