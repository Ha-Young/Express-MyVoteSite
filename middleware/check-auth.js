const jwt = require('jsonwebtoken');
const createError = require('http-errors')

module.exports = (req, res, next) => {
  console.log(req.headers.cookie)
  // console.log(req);  // console.log(2222222222222222222)
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch(e) {
    throw(createError(401, "Auth failed"));
  }
};