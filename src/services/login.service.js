const Joi = require('joi');
const db = require('../models');

const verificaParametros = async (info) => {
  const schema = Joi.object({
    email: Joi.string().email().required,
    password: Joi.string().required,
  });

  const { error, value } = schema.validate(info);

  console.log(error);
  if (error) {
    return error;
  }

  return value;
};

const verificaLogin = async (email, password) => {
  const user = await db.findOne({
    where: { email },
  });
  console.log(user, password);
};
/* const verificaLogin = async (email, password) => {
    const user = await models.User.findOne({
    where: { email, password },
  });

   if (!user) {
    throw new Error('usuario não existe');
  }

  return true;
}; */

module.exports = {
  verificaParametros,
  verificaLogin,
};
