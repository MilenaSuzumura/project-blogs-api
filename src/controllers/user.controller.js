const jwt = require('jsonwebtoken');
const { userService } = require('../services/index.service');

const cadastrarUser = async (req, res) => {
  const result = await userService.verificaParametros(req.body);

  if (result.status) {
    return res.status(result.status).json({ message: result.message });
  }

  const cadastroRealizado = await userService.cadastrar(req.body);
  return res.status(201).json({ token: cadastroRealizado });
};

const exibeUsers = async (_req, res) => {
  const result = await userService.todosUsers();
  const mapRest = result.reduce((acc, user) => {
    const { password: _, ...userWithoutPassword } = user.dataValues;
    acc.push(userWithoutPassword);
    return acc;
  }, []);
  return res.status(200).json(mapRest);
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
  cadastrarUser,
  exibeUsers,
  exibeId,
  deleteMe,
};