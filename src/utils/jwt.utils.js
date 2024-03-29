require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '60m',
    algorithm: 'HS256',
  });

  return token;
};

const getToken = (authorization) => jwt.verify(authorization, process.env.JWT_SECRET);

const getInfoUser = (authorization) => {
  const infoUser = getToken(authorization);
  return infoUser.data;
};

module.exports = { 
  createToken,
  getToken,
  getInfoUser,
};
