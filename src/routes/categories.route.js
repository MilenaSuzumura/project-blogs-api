const { Router } = require('express');
const categoriesController = require('../controllers/categories.controller');
const verifyToken = require('../middleware/verifyToken');

const categoriesRouter = Router();

categoriesRouter.post('/', verifyToken, categoriesController.registerCategory);
categoriesRouter.get('/', verifyToken, categoriesController.exibeCategories);

module.exports = categoriesRouter;
