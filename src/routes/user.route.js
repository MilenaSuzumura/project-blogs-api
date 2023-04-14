const { Router } = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/verifyToken');

const userRouter = Router();

userRouter.post('/', userController.registerUser);
userRouter.get('/', verifyToken, userController.getAllUsers);
userRouter.get('/:id', verifyToken, userController.getOneUser);
userRouter.delete('/me', verifyToken, userController.deleteMe);

module.exports = userRouter;
