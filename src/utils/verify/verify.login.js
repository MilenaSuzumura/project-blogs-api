const { emailAndPasswordValidation } = require('../schema');

const verifyParametersLogin = (info) => {
  const { error, value } = emailAndPasswordValidation.validate(info);

  if (error) {
    return {
      status: 400,
      message: 'Some required fields are missing',
    };
  }

  return value;
};

const verifyEmail = (user, password) => {
  if (!user || user.password !== password) {
    return {
      status: 400,
      message: 'Invalid fields',
    };
  }

  return false;
};

module.exports = {
  verifyParametersLogin,
  verifyEmail,
};
