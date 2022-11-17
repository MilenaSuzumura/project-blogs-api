const { Router } = require('express');
const controllers = require('../controllers/index.controller');

const loginRouter = Router();

loginRouter.post('/', controllers.loginController);

module.exports = loginRouter;