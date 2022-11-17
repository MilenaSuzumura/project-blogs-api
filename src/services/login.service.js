const Joi = require('joi');
const { User } = require('../models');
const { createToken } = require('../utils/jwt.utils');

const verificaParametros = (info) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(info);

  if (error) {
    return error;
  }

  return value;
};

const findByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const verificaLogin = async (email, password) => {
  const user = await findByEmail(email);
  // console.log(user);
  const resultado = {
    status: 0,
    message: '',
    token: '',
  };

  if (!user || user.password !== password) {
    resultado.status = 400;
    resultado.message = 'Invalid fields';
    return resultado;
  }
  
  const { password: _, ...userWithoutPassword } = user.dataValues;
  const token = createToken(userWithoutPassword);

  resultado.status = 200;
  resultado.token = token;
  return resultado;
};

module.exports = {
  verificaParametros,
  verificaLogin,
};
