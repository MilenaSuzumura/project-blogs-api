const { findByEmail } = require('../callModel/user.callModel');
const { createToken } = require('../utils/jwt.utils');
const { emailAndPassword } = require('../utils/schema');

const verifyParameters = (info) => {
  const { error, value } = emailAndPassword.validate(info);

  if (error) {
    return {
      status: 400,
      message: 'Some required fields are missing',
    };
  }

  return value;
};

const verifyLogin = async (email, password) => {
  const user = await findByEmail(email);

  if (!user || user.password !== password) {
    return {
      status: 400,
      message: 'Invalid fields',
    };
  }
  
  const { password: _, ...userWithoutPassword } = user.dataValues;
  const token = createToken(userWithoutPassword);

  return {
    status: 200,
    token,
  };
};

module.exports = {
  verifyParameters,
  verifyLogin,
};
