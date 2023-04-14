const { nameCategoryValidation } = require('../schema');

const verifyParametersCategories = (info) => {
  const { error, value } = nameCategoryValidation.validate(info);
  if (error) {
    return {
      status: 400,
      message: error.message,
    };
  }

  return value;
};

module.exports = { verifyParametersCategories };