import Joi from 'joi';

const centerWithIdSchema = {
  body: {
    name: Joi.string().required(),
    detail: Joi.string().required(),
    image: Joi.string().required(),
    address: Joi.string().required(),
    state: Joi.string().required()
    // facilities: Joi.array().items(Joi.string()).required()
  },
  params: {
    centerId: Joi.number().required()
  }
};

module.exports = centerWithIdSchema;
