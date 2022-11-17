const Joi = require('joi');
const { User } = require('../models');
const { createToken } = require('../utils/jwt.utils');

const schema = Joi.object({
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

const findByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const verificaParametros = async (info) => {
  const { error } = schema.validate(info);
  if (error) {
    return {
      status: 400,
      message: error.message,
    };
  }

  console.log(`Info Email: ${info.email}`);
  const user = await findByEmail(info.email);
  if (user !== null) {
    return {
      status: 409,
      message: 'User already registered',
    };
  }
  return '';
};

const cadastrar = async (info) => {
  await User.create({ ...info });
  const { password: _, ...userWithoutPassword } = info;
  const token = createToken(userWithoutPassword);
  return token;
};

const todosUsers = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = {
  verificaParametros,
  cadastrar,
  todosUsers,
};