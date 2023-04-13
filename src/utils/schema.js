const Joi = require('joi');

const emailAndPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createUserValidation = Joi.object({
  displayName: Joi.string().min(8).required()
    .messages({
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
  email: Joi.string().email().required()
    .messages({
      'string.email': '"email" must be a valid email',
    }),
  password: Joi.string().min(6).required()
    .messages({
      'string.min': '"password" length must be at least 6 characters long',
    }),
  image: Joi.string(),
});

module.exports = {
  emailAndPasswordValidation,
  createUserValidation,
};
