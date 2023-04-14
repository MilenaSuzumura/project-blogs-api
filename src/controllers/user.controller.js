const userService = require('../services/user.service');
const { getToken } = require('../utils/jwt.utils');

const registerUser = async (req, res) => {
  const verifyAll = await userService.verifyAll(req.body);

  if (verifyAll) {
    const { status, message } = verifyAll;
    return res.status(status).json({ message });
  }

  const { status, token } = await userService.register(req.body);
  return res.status(status).json({ token });
};

const getAllUsers = async (_req, res) => {
  const users = await userService.getAll();
  return res.status(200).json(users);
};

const getOneUser = async (req, res) => {
  const result = await userService.getOneUsers(req.params.id);
  const { status, message } = result;
  return res.status(status).json(message);
};

const deleteMe = async (req, res) => {
  const { authorization } = req.headers;
  const token = getToken(authorization);
  await userService.deleteMe(token.data.id);
  return res.status(204).end();
};

module.exports = {
  registerUser,
  getAllUsers,
  getOneUser,
  deleteMe,
};
