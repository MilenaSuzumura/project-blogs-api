const { Router } = require('express');
const { postController } = require('../controllers/index.controller');
const verificacaoToken = require('../utils/verificacaoToken');

const postRouter = Router();

postRouter.post('/', verificacaoToken, postController.cadastrarPost);

module.exports = postRouter;