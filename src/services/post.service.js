const {
  verifyParametersPost,
  verifyArrayCategory,
  verifyModifyPost,
} = require('../utils/verify/verify.post');
const { findCategoryId } = require('../callModel/category.callModel');
const { findByIdPostsCategories } = require('../callModel/postCategory.callModel');
const { findById } = require('../callModel/user.callModel');
const {
  registerBlogPost,
  getAllPosts,
  findPostsId,
  modify,
  deleteBlogPost,
  search,
} = require('../callModel/blogPost.callModel');

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

const findOnePost = async (idString) => {
  const id = parseInt(idString, 10);
  const post = await findPostsId(id);

  if (!post) {
    return { status: 404, message: 'Post does not exist' };
  }

  const findPost = await listPost([post]);
  return findPost[0];
};

const modifyPost = async (info, idPost) => {
  const verify = verifyModifyPost(info);

  if (verify.status) return verify;

  await modify(idPost, verify);

  const otherInfoPost = await findOnePost(idPost);
  const post = await findPostsId(idPost);
  return { ...post, ...otherInfoPost };
};

const deletePost = async (idString) => {
  const id = Number(idString);
  await deleteBlogPost(id);
};

const searchPost = async (query) => {
  const infoPost = await search(query);
  const allInfo = await listPost(infoPost);
  return allInfo;
};

module.exports = {
  verifyParameters,
  registerPost,
  getPosts,
  findOnePost,
  modifyPost,
  deletePost,
  searchPost,
};
