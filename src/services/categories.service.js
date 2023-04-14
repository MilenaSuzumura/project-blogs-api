const { Category } = require('../models');
const { verifyParametersCategories } = require('../utils/verify/verify.categories');
const { registerCategory } = require('../callModel/category.callModel');

const verifyParameters = (info) => verifyParametersCategories(info);

const register = async (info) => registerCategory(info);

const everyCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  verifyParameters,
  register,
  everyCategories,
};
