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

module.exports = {
  cadastrarUser,
  exibeUsers,
};