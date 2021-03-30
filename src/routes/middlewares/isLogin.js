const jwt = require("express-jwt");
const { jwtSecret, jwtAlgorithms, jwtCookieKey } = require("../../config");

const getTokenFromHeader = req => {
  if (
    (req.cookies && req.cookies[jwtCookieKey])
  ) {
    return req.cookies[jwtCookieKey];
  }
  return null;
};

const isLogin = jwt({
  secret: jwtSecret,
  userProperty: 'token',
  resultProperty: 'locals.user',
  algorithms: jwtAlgorithms,
  getToken: getTokenFromHeader,
});

module.exports = isLogin;
