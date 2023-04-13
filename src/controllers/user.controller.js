const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

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

const exibeId = async (req, res) => {
  const result = await userService.findById(req.params.id);

  if (!result) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  const { password: _, ...userWithoutPassword } = result.dataValues;
  return res.status(200).json(userWithoutPassword);
};

const deleteMe = async (req, res) => {
  const { authorization } = req.headers;
  const token = jwt.verify(authorization, process.env.JWT_SECRET);
  await userService.deleteUser(token.data.id);
  return res.status(204).end();
};

module.exports = {
  registerUser,
  getAllUsers,
  exibeId,
  deleteMe,
};
