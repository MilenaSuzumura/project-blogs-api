const { userService } = require('../services/index.service');

const user = async (req, res) => {
  const result = await userService.verificaParametros(req.body);

  if (result.status) {
    return res.status(result.status).json({ message: result.message });
  }

  const cadastroRealizado = await userService.cadastrar(req.body);
  return res.status(201).json({ token: cadastroRealizado });
};

module.exports = user;