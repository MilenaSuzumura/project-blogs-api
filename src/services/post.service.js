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

 const findCategoryId = async (id) => {
  const result = await Category.findByPk(id);
  return result;
};

const verificaCategoryId = async (arrayCategory) => {
  const mapValue = await Promise.all(arrayCategory
    .map((categoryId) => findCategoryId(categoryId)));
  const everyValue = mapValue.every((category) => Boolean(category));
  return everyValue;
};

const verificaParametros = async (info) => {
  const { error, value } = schema.validate(info);
  if (error) {
    return {
      status: 400,
      message: error.message,
    };
  }

  const mapValue = await verificaCategoryId(value.categoryIds);

  if (!mapValue) {
    return {
      status: 400,
      message: 'one or more "categoryIds" not found',
    };
  }

  return value;
};

const cadastrar = async (title, content, userId) => {
  const category = await BlogPost.create({ title, content, userId });
  console.log(category);
/*   const category = await BlogPost.create({ ...info });
  return category; */
};

const everyPosts = async () => {
  const users = await BlogPost.findAll();
  return users;
};

/* 

const findById = async (id) => {
  const user = await User.findOne({
    where: { id },
  });
  return user;
}; */

module.exports = {
  verificaParametros,
  cadastrar,
  everyPosts,
/*   todosUsers,
  findById, */
};