const { registerPostValidation } = require('../schema');
const { findCategoryId } = require('../../callModel/category.callModel');

const verifyParametersPost = (info) => {
  const { error, value } = registerPostValidation.validate(info);
  if (error) {
    return {
      status: 400,
      message: error.message,
    };
  }

  return value;
};

const verifyArrayCategory = async (verify) => {
  const { categoryIds } = verify;
  const arrayCategory = await Promise.all(
    categoryIds.map((categoryId) => findCategoryId(categoryId)),
  );
  const everyValue = arrayCategory.every((category) => Boolean(category));
  
  if (!everyValue) {
    return {
      status: 400,
      message: 'one or more "categoryIds" not found',
    };
  }

  return verify;
};

module.exports = { verifyParametersPost, verifyArrayCategory };