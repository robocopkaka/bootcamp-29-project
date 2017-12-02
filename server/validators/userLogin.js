import Joi from 'joi';

const userLoginSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
  // params: {
  //   centerId: Joi.string().required()
  // }
};

module.exports = userLoginSchema;
