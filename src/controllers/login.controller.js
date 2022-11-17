const { loginService } = require('../services/index.service');

const login = async (req, res) => {
  const verificaParametros = loginService.verificaParametros(req.body);

  if (!verificaParametros.email) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { email, password } = verificaParametros;
  const verificaLogin = await loginService.verificaLogin(email, password);

  if (verificaLogin.message.length !== 0) {
    return res.status(verificaLogin.status).json({ message: verificaLogin.message });
  }

  return res.status(verificaLogin.status).json({ token: verificaLogin.token });
};

module.exports = login;