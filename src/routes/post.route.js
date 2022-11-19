const { Router } = require('express');
const { postController } = require('../controllers/index.controller');
const verificacaoToken = require('../utils/verificacaoToken');

const postRouter = Router();

postRouter.post('/', verificacaoToken, postController.cadastrarPost);
postRouter.get('/', verificacaoToken, postController.exibePosts);
postRouter.get('/:id', verificacaoToken, postController.exibeIdPost);

module.exports = postRouter;