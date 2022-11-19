const jwt = require('jsonwebtoken');
const { postService } = require('../services/index.service');

const cadastrarPost = async (req, res) => {
  const result = await postService.verificaParametros(req.body);
  
  if (result.status) {    
    return res.status(result.status).json({ message: result.message });
  }
  
  const { authorization } = req.headers;
  const token = jwt.verify(authorization, process.env.JWT_SECRET); 
  const { title, content, categoryIds } = result;
  const cadastro = await postService.cadastrarPost(title, content, token.data.id, categoryIds);
  return res.status(201).json(cadastro);
};

const exibePosts = async (_req, res) => {
  const result = await postService.everyInfo();
  return res.status(200).json(result);
};
 
const exibeIdPost = async (req, res) => {
  const result = await postService.oneInfo(req.params.id);

  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(result);
}; 

module.exports = {
  cadastrarPost,
  exibePosts,
  exibeIdPost,
};