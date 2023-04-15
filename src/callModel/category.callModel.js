const { Category } = require('../models');

const registerCategory = async (info) => {
  const category = await Category.create({ ...info });
  return category;
};

const getAllCategory = async () => {
  const categories = await Category.findAll();
  return categories;
};

const findCategoryId = async (id) => {
  const result = await Category.findByPk(id);
  return result.dataValues;
};

module.exports = { registerCategory, getAllCategory, findCategoryId };
