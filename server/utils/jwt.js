const jwt = require('jsonwebtoken');

const JWT_ERROR = {
  EMPTY_STRING: 'JsonWebTokenError',
  EXPIRED_TOKEN: 'TokenExpiredError',
};

const generateJWT = payload => {
  const token = jwt.sign({ user: payload }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });
  return token;
};

const verifyJWT = token => {
  try {
    const { user } = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    return user;
  } catch (err) {
    if (err.name === JWT_ERROR.EMPTY_STRING) return null;
    if (err.name === JWT_ERROR.EXPIRED_TOKEN) return null;
    throw new Error(err);
  }
};

module.exports = {
  generateJWT,
  verifyJWT,
};
