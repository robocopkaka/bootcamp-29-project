import Joi from 'joi';

const userSchema = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean()
  }
  // params: {
  //   centerId: Joi.string().required()
  // }
};

module.exports = userSchema;
