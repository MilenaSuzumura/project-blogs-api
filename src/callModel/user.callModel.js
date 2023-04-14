const { User } = require('../models');

const getAllUsers = async () => {
  const users = await User.findAll({
    raw: true,
    attributes: {
      exclude: ['password'],
    },
  });

  return users;
};

const findById = async (id) => {
  const user = await User.findOne({
    raw: true,
    where: { id },
    attributes: {
      exclude: ['password'],
    },
  });

  return user;
};

const findByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  return user;
};

const registerUser = async (info) => {
  await User.create({ ...info });
};

module.exports = {
  getAllUsers,
  findById,
  findByEmail,
  registerUser,
};
