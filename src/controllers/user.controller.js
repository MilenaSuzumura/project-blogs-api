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
  const { password: _, ...userWithoutPassword } = result;
  return res.status(200).json(userWithoutPassword);
};

module.exports = {
  cadastrarUser,
  exibeUsers,
};