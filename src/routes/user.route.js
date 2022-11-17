const { Router } = require('express');
const controllers = require('../controllers/index.controller');

const userRouter = Router();

userRouter.post('/', controllers.userController);

module.exports = userRouter;