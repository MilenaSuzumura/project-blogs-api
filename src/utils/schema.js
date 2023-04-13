const Joi = require('joi');

const emailAndPassword = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  emailAndPassword,
};
