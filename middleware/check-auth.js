const jwt = require('jsonwebtoken');
const createError = require('http-errors')

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch(e) {
    throw(createError(401, "Auth failed"));
  }
};