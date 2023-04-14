const { BlogPost } = require('../models');
const { registerPostCategory } = require('./postCategory.callModel');

const registerBlogPost = async (title, content, userId, categoryId) => {
  const category = await BlogPost.create({ title, content, userId });
  await Promise.all(categoryId
    .map((id) => registerPostCategory(category.dataValues.id, id)));
  return category.dataValues;
};

module.exports = { registerBlogPost };