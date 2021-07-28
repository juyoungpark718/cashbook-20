const { verifyJWT } = require('../utils/jwt');

const privateRouter = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(400).json({});
    return;
  }
  const bearer = authorization.split('Bearer ').filter(str => str);
  if (!bearer.length) {
    res.status(400).json({});
    return;
  }
  const token = bearer[0];
  const user = verifyJWT(token);
  if (!user) {
    res.status(401).json({});
    return;
  }
  req.user = user;
  next();
};

module.exports = {
  privateRouter,
};
