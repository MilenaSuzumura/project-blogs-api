const Joi = require('joi');
const { BlogPost, Category, PostCategory, User } = require('../models');

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

const cadastraPostCategory = async (postId, categoryId) => {
  await PostCategory.create({ postId, categoryId });
};

const cadastrarPost = async (title, content, userId, categoryId) => {
  const category = await BlogPost.create({ title, content, userId });
  await Promise.all(categoryId
    .map((id) => cadastraPostCategory(category.dataValues.id, id)));
  return category.dataValues;
};

const everyPosts = async () => {
  const users = await BlogPost.findAll();
  return users;
};

const findPostsCategories = async (postId) => {
  const postArray = await PostCategory.findAll({
    where: { postId },
  });
  return postArray;
};

const findById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return user;
};

const everyInfo = async () => {
  const posts = await everyPosts();

  const mapRest = await Promise.all(posts.map(async (post) => {
    const { userId, id } = post.dataValues;

    const { dataValues } = await findById(userId);
    const categoriesInfo = await findPostsCategories(id);
    const mapCategories = await Promise.all(categoriesInfo
      .map((info) => findCategoryId(info.dataValues.categoryId)));
    const newPost = { ...post.dataValues,
      user: dataValues,
      categories: mapCategories };
    return newPost;
  }));
  return mapRest;
};

module.exports = {
  verificaParametros,
  cadastrarPost,
  everyInfo,
};