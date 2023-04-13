const loginService = require('../services/login.service');

const login = async (req, res) => {
  const verifyParameters = loginService.verifyParameters(req.body);

  if (verifyParameters.status) {
    const { status, message } = verifyParameters;

    return res.status(status).json({ message });
  }

  const { email, password } = verifyParameters;
  const verifyLogin = await loginService.login(email, password);

  if (verifyLogin.message) {
    const { status, message } = verifyLogin;
    return res.status(status).json({ message });
  }

  const { status, token } = verifyLogin;

  return res.status(status).json({ token });
};

module.exports = { login };
