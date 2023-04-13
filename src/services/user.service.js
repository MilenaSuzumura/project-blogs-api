const { User } = require('../models');
const { registerUser, findByEmail, getAllUsers } = require('../callModel/user.callModel');
const { createToken } = require('../utils/jwt.utils');
const { verifyEmail, verifyParameters } = require('../utils/verify/verify.user');

const verifyAll = async (info) => {
  const verify = verifyParameters(info);

  if (verify) return verify;

  const emailExists = await findByEmail(info.email);
  const haveEmail = await verifyEmail(emailExists);

  if (haveEmail) return haveEmail;

  return false;
};

const register = async (info) => {
  await registerUser(info);

  const { password: _, ...userWithoutPassword } = info;
  const token = createToken(userWithoutPassword);
  return {
    status: 201,
    token,
  };
};

const getAll = async () => getAllUsers();

const findById = async (id) => {
  const user = await User.findOne({
    where: { id },
  });
  return user;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  verifyEmail,
  verifyParameters,
  verifyAll,
  register,
  getAll,
  findById,
  deleteUser,
};
