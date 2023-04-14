const Joi = require('joi');
const { BlogPost, PostCategory, User } = require('../models');
const { verifyParametersPost, verifyArrayCategory } = require('../utils/verify/verify.post');
const { findCategoryId } = require('../callModel/category.callModel');
const { registerBlogPost } = require('../callModel/blogPost.callModel');

const verificaAlteracao = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const verifyParameters = async (info) => {
  const verify = verifyParametersPost(info);

  if (verify.message) {
    return verify;
  }

  const validateCategory = await verifyArrayCategory(verify);
  return validateCategory;
};

const registerPost = async (infoPost, userId) => {
  const { title, content, categoryIds } = infoPost;
  const register = registerBlogPost(title, content, userId, categoryIds);
  return register;
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

const findPostsId = async (id) => {
  const postArray = await BlogPost.findOne({
    where: { id },
  });
  return postArray;
};

const oneInfo = async (id) => {
  const post = await findPostsId(id);

  if (!post) {
    return post;
  }

  const { dataValues } = await findById(post.userId);
  const categoriesInfo = await findPostsCategories(id);
  const mapCategories = await Promise.all(categoriesInfo
    .map((info) => findCategoryId(info.dataValues.categoryId)));
  const newPost = { ...post.dataValues,
    user: dataValues,
    categories: mapCategories };
  return newPost;
};

const validaUsuario = async (idUser, idPost) => {
  const teste = await findPostsId(idPost);

  if (!teste) {
    return {
      status: 404,
    };
  }

  const { userId } = teste.dataValues;
  if (idUser !== userId) {
    return false;
  }
  return true;
};

const alteraInfoPost = async (info, idPost) => {
  const { error, value } = verificaAlteracao.validate(info);

  if (error) {
    return false;
  }

  await BlogPost.update({ ...value }, {
    where: { id: idPost },
  });

  const altera = await oneInfo(idPost);
  return altera;
};

const Delet = async (idString) => {
  const id = Number(idString);
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  verifyParameters,
  registerPost,
  everyInfo,
  oneInfo,
  validaUsuario,
  alteraInfoPost,
  Delet,
};
