const { loginService } = require('../services/index.service');

const login = (req, res) => {
  const verificaParametros = loginService.verificaParametros(req.body);

  if (!verificaParametros.email) {
    res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { email, password } = verificaParametros;
  const verificaLogin = loginService.verificaLogin(email, password);

  if (!verificaLogin.token) {
    res.status(200).json({ message: 'Invalid fields' });
  }

  res.status(200).json(verificaLogin.token);
};

module.exports = login;