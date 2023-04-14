const { PostCategory } = require('../models');

const registerPostCategory = async (postId, categoryId) => {
  await PostCategory.create({ postId, categoryId });
};

module.exports = { registerPostCategory };