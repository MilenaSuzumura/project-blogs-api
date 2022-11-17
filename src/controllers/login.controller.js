const { loginService } = require('../services/index.service');

const login = async (req, res) => {
  const verificaParametros = loginService.verificaParametros(req.body);

  if (!verificaParametros.email) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { email, password } = verificaParametros;
  const verificaLogin = await loginService.verificaLogin(email, password);

  return res.status(verificaLogin.status).json(verificaLogin.message);
};

module.exports = login;