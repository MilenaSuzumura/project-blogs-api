const Joi = require('joi');
const { BlogPost, Category } = require('../models');

const schema = Joi.object({
  title: Joi.string().required()
    .messages({
      'string.empty': 'Some required fields are missing',
    }),
  content: Joi.string().required()
    .messages({
      'string.empty': 'Some required fields are missing',
    }),
    categoryIds: Joi.array().min(1).required()
    .messages({
      'any.required': 'Some required fields are missing',
      'string.min': 'one or more "categoryIds" not found',
    }),
});

/* const findCategoryId = async (id) => {
  const result = await Category.findOne({ where: { id } });
  return result;
}; */

const everyCategoriesId = async () => {
  const result = await Category.findAll({ attributes: ['id'] });
  return result;
};

const verificaCategoryId = async (arrayCategory) => {
  const arrayCategories = await everyCategoriesId();
  const mapValue = arrayCategory.every((category) => {
    const result = arrayCategories.some(({ dataValues }) => category === dataValues.id);
    return result;
  });
  console.log(mapValue);
  return mapValue;
};

const verificaParametros = (info) => {
  const { error, value } = schema.validate(info);
  if (error) {
    return {
      status: 400,
      message: error.message,
    };
  }

  const mapValue = verificaCategoryId(value.categoryIds);

  if (!mapValue) {
    return {
      status: 400,
      message: 'one or more "categoryIds" not found',
    };
  }

  return value;
};

const cadastrar = async (info) => {
  const category = await BlogPost.create({ ...info });
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
}; */

module.exports = {
  verificaParametros,
  cadastrar,
/*   todosUsers,
  findById, */
};