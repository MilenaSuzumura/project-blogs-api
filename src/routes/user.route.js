const { Router } = require('express');
const { userController } = require('../controllers/index.controller');
const verificacaoToken = require('../utils/verificacaoToken');

const userRouter = Router();

userRouter.post('/', userController.cadastrarUser);
userRouter.get('/', verificacaoToken, userController.exibeUsers);

module.exports = userRouter;