const { verifyParametersCategories } = require('../utils/verify/verify.categories');
const { registerCategory, getAllCategory } = require('../callModel/category.callModel');

const verifyParameters = (info) => verifyParametersCategories(info);

const register = async (info) => registerCategory(info);

const getCategories = async () => getAllCategory();

module.exports = {
  verifyParameters,
  register,
  getCategories,
};
