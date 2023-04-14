const { Router } = require('express');
const postController = require('../controllers/post.controller');
const verifyToken = require('../middleware/verifyToken');

const postRouter = Router();

postRouter.post('/', verifyToken, postController.registerPost);
postRouter.get('/', verifyToken, postController.exibePosts);
postRouter.get('/:id', verifyToken, postController.exibeIdPost);
postRouter.put('/:id', verifyToken, postController.alterar);
postRouter.delete('/:id', verifyToken, postController.deletePost);

module.exports = postRouter;
