const { Router } = require('express');
const postController = require('../controllers/post.controller');
const verifyToken = require('../middleware/verifyToken');
const verifySameUser = require('../middleware/verifySameUser');

const postRouter = Router();

postRouter.post('/', verifyToken, postController.registerPost);
postRouter.get('/', verifyToken, postController.getPosts);
postRouter.get('/:id', verifyToken, postController.findByIdPost);
postRouter.put('/:id', verifyToken, verifySameUser, postController.modifyPost);
postRouter.delete('/:id', verifyToken, verifySameUser, postController.deletePost);

module.exports = postRouter;
