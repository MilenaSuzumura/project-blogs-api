const { createToken } = require('../utils/jwt.utils');
const { verifyEmail, verifyParameters } = require('../utils/verify/verify.user');
const {
  getAllUsers,
  findById,
  findByEmail,
  registerUser,
  deleteUser,
} = require('../callModel/user.callModel');

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

const getOneUser = async (id) => {
  const user = await findById(id);

  if (user) return { status: 200, message: user };

  return {
    status: 404,
    message: { message: 'User does not exist' },
  };
};

const deleteMe = async (id) => deleteUser(id);

module.exports = {
  verifyEmail,
  verifyParameters,
  verifyAll,
  register,
  getAll,
  getOneUser,
  deleteMe,
};
