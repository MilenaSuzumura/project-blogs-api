const { BlogPost } = require('../models');
const { registerPostCategory } = require('./postCategory.callModel');

const registerBlogPost = async (title, content, userId, categoryId) => {
  const category = await BlogPost.create({ title, content, userId });
  await Promise.all(categoryId
    .map((id) => registerPostCategory(category.dataValues.id, id)));
  return category.dataValues;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({ raw: true });
  return posts;
};

const findPostsId = async (id) => {
  const postArray = await BlogPost.findOne({
    raw: true,
    where: { id },
  });

  return postArray;
};

const modify = async (id, infoPost) => {
  await BlogPost.update({ ...infoPost }, {
    where: { id },
  });
};

module.exports = { registerBlogPost, getAllPosts, findPostsId, modify };
