const { findByEmail } = require('../callModel/user.callModel');
const { createToken } = require('../utils/jwt.utils');
const { verifyParametersLogin, verifyEmail } = require('../utils/verify/verify.login');

const verifyParameters = (info) => verifyParametersLogin(info);

const login = async (email, password) => {
  const user = await findByEmail(email);
  const verify = verifyEmail(user, password);

  if (verify) return verify;
  
  const { password: _, ...userWithoutPassword } = user.dataValues;
  const token = createToken(userWithoutPassword);

  return {
    status: 200,
    token,
  };
};

module.exports = {
  verifyParameters,
  login,
};
