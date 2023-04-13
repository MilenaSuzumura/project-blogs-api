const { User } = require('../models');

const findByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const registerUser = async (info) => {
  await User.create({ ...info });
};

const getAllUsers = async () => {
  const users = await User.findAll({
    raw: true,
    attributes: {
      exclude: ['password'],
    },
  });

  return users;
};

module.exports = {
  findByEmail,
  registerUser,
  getAllUsers,
};
