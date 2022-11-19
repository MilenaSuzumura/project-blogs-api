const { Router } = require('express');
const { userController } = require('../controllers/index.controller');
const verificacaoToken = require('../utils/verificacaoToken');

const userRouter = Router();

userRouter.post('/', userController.cadastrarUser);
userRouter.get('/', verificacaoToken, userController.exibeUsers);
userRouter.get('/:id', verificacaoToken, userController.exibeId);
userRouter.delete('/me', verificacaoToken, userController.deleteMe);

module.exports = userRouter;