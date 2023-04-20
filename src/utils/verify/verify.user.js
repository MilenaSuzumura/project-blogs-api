const { createUserValidation } = require('../schema');

const verifyParameters = (info) => {
  const { error } = createUserValidation.validate(info);
  if (error) {
    return {
      status: 400,
      message: error.message,
    };
  }

  return false;
};

const verifyEmail = async (emailExists) => {
  if (emailExists !== null) {
    return {
      status: 409,
      message: 'User already registered',
    };
  }

  return false;
};

module.exports = {
  verifyParameters,
  verifyEmail,
};
