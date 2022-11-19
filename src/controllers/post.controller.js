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
  const result = await postService.everyPosts();
  const mapRest = result.reduce((acc, post) => {
    acc.push(post.dataValues);
    return acc;
  }, []);
  return res.status(200).json(mapRest);
};
/* 
const exibeId = async (req, res) => {
  const result = await userService.findById(req.params.id);

  if (!result) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  const { password: _, ...userWithoutPassword } = result.dataValues;
  return res.status(200).json(userWithoutPassword);
}; */

module.exports = {
  cadastrarPost,
  exibePosts,
/*   exibeUsers,
  exibeId, */
};