const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const { jwtSecret, jwtCookieKey } = require("../../config").jwt;

const getTokenFromHeader = req => {
  if (
    (req.cookies && req.cookies[jwtCookieKey])
  ) {
    return req.cookies[jwtCookieKey];
  }
  return null;
};

const isLogin = (req, res, next) => {
  const jwtToken = getTokenFromHeader(req);

  if (!jwtToken) {
    return res.redirect('/login');
  }

  jwt.verify(jwtToken, jwtSecret, async (err, decoded) => {
    if (err) {
      return next(createError(err));
    }

    const user = await User.findById(decoded._id);

    if (!user) {
      return next(401);
    }

    req.user = user;
    res.locals.user = user;

    next();
  });
};

module.exports = isLogin;
