require('dotenv/config');
const jwt = require('jsonwebtoken');

const verificacaoToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const { data } = jwt.verify(authorization, process.env.JWT_SECRET);

  if (!data) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = verificacaoToken;