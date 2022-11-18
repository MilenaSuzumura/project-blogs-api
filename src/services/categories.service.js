const Joi = require('joi');
const { Category } = require('../models');

const schema = Joi.object({
  name: Joi.string().required()
    .messages({
      'string.base': '"name" is required',
    }),
});

const verificaParametros = async (info) => {
  const { error, value } = schema.validate(info);
  if (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
  return value;
};

const cadastrar = async (info) => {
  const category = await Category.create({ ...info });
  return category;
};

/* const todosUsers = async () => {
  const users = await User.findAll();
  return users;
};

const findById = async (id) => {
  const user = await User.findOne({
    where: { id },
  });
  return user;
};
 */
module.exports = {
  verificaParametros,
  cadastrar,
/*   todosUsers,
  findById, */
};