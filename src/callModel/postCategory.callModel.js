const { PostCategory } = require('../models');

const registerPostCategory = async (postId, categoryId) => {
  await PostCategory.create({ postId, categoryId });
};

const findByIdPostsCategories = async (postId) => {
  const postArray = await PostCategory.findAll({
    where: { postId },
  });
  return postArray;
};

module.exports = { registerPostCategory, findByIdPostsCategories };
