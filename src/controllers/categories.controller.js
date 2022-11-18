const { categoriesService } = require('../services/index.service');

const cadastrarCategory = async (req, res) => {
  const result = await categoriesService.verificaParametros(req.body);

  if (result.status) {
    return res.status(result.status).json({ message: result.message });
  }
  const cadastroRealizado = await categoriesService.cadastrar(result);
  return res.status(201).json(cadastroRealizado);
};

/* const exibeUsers = async (_req, res) => {
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
}; */

module.exports = {
  cadastrarCategory,
};