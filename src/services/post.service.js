const Joi = require('joi');
const { BlogPost } = require('../models');
const { verifyParametersPost, verifyArrayCategory } = require('../utils/verify/verify.post');
const { findCategoryId } = require('../callModel/category.callModel');
const { registerBlogPost, getAllPosts } = require('../callModel/blogPost.callModel');
const { findByIdPostsCategories } = require('../callModel/postCategory.callModel');
const { findById } = require('../callModel/user.callModel');

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

const listPost = async (posts) => {
  const mapRest = await Promise.all(posts.map(async (post) => {
    const { userId, id } = post;

    const user = await findById(userId);
    const postCategories = await findByIdPostsCategories(id);
    const categories = await Promise.all(postCategories
      .map((postCategory) => findCategoryId(postCategory.categoryId)));
    const newPost = {
      ...post,
      user,
      categories,
    };
    return newPost;
  }));

  return mapRest;
};

const getPosts = async () => {
  const posts = await getAllPosts();
  const allPosts = await listPost(posts);
  return allPosts;
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
  const categoriesInfo = await findByIdPostsCategories(id);
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
  getPosts,
  oneInfo,
  validaUsuario,
  alteraInfoPost,
  Delet,
};
