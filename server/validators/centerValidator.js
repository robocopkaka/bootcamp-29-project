import Joi from 'joi';

const centerSchema = {
  body: {
    name: Joi.string().required(),
    detail: Joi.string().required(),
    image: Joi.string().required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    facilities: Joi.array().items(Joi.string()),
    events: Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      date: Joi.string().required(),
      time: Joi.string().required(),
      centerId: Joi.number().required()
    })
  }
  // params: {
  //   centerId: Joi.string().required()
  // }
};

module.exports = centerSchema;
