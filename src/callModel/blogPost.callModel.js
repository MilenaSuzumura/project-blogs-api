const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');
const { registerPostCategory } = require('./postCategory.callModel');

const registerBlogPost = async (title, content, userId, categoryId) => {
  const category = await BlogPost.create({ title, content, userId });
  await Promise.all(categoryId
    .map((id) => registerPostCategory(category.id, id)));
  return category;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    raw: true,
    nest: true,
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const findPostsId = async (id) => {
  const postArray = await BlogPost.findOne({
    raw: true,
    where: { id },
    nest: true,
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
});

  return postArray;
};

const modify = async (id, infoPost) => {
  await BlogPost.update({ ...infoPost }, {
    where: { id },
  });
};

const deleteBlogPost = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

const search = async (query) => {
  const postArray = await BlogPost.findAll({
    raw: true,
    where: {
      [Op.or]: [
      { title: { [Op.like]: `%${query}%` } },
      { content: { [Op.like]: `%${query}%` } },
    ] },
  });

  return postArray;
};

module.exports = { registerBlogPost, getAllPosts, findPostsId, modify, deleteBlogPost, search };
