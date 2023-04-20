const postService = require('../services/post.service');
const { getToken } = require('../utils/jwt.utils');

const registerPost = async (req, res) => {
  const verify = await postService.verifyParameters(req.body);

  if (verify.status) {
    const { status, message } = verify;
    return res.status(status).json({ message });
  }
  
  const { authorization } = req.headers;
  const token = getToken(authorization); 

  const register = await postService.registerPost(verify, token.data.id);
  return res.status(201).json(register);
};

const getPosts = async (_req, res) => {
  const result = await postService.getPosts();
  return res.status(200).json(result);
};
 
const findByIdPost = async (req, res) => {
  const post = await postService.findOnePost(req.params.id);

  if (post.status) {
    const { status, message } = post;
    return res.status(status).json({ message });
  }

  return res.status(200).json(post);
}; 

const modifyPost = async (req, res) => {
  const post = await postService.modifyPost(req.body, req.params.id);

  if (post.status) {
    const { status, message } = post;
    return res.status(status).json({ message });
  }

  return res.status(200).json(post);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await postService.deletePost(id);

  return res.status(204).end();
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  const query = postService.searchPost(q);
  return res.status(200).json(query);
};

module.exports = {
  registerPost,
  getPosts,
  findByIdPost,
  modifyPost,
  deletePost,
  searchPost,
};
