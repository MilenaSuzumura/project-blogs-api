const { Router } = require('express');
const { categoriesController } = require('../controllers/index.controller');
const verificacaoToken = require('../utils/verificacaoToken');

const categoriesRouter = Router();

categoriesRouter.post('/', verificacaoToken, categoriesController.cadastrarCategory);
categoriesRouter.get('/', verificacaoToken, categoriesController.exibeCategories);

module.exports = categoriesRouter;