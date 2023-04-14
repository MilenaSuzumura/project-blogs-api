const { Category } = require('../models');

const registerCategory = async (info) => {
  const category = await Category.create({ ...info });
  return category;
};

module.exports = { registerCategory };
