const { Category } = require('../models');

const registerCategory = async (info) => {
  const category = await Category.create({ ...info });
  return category;
};

const getAllCategory = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = { registerCategory, getAllCategory };
