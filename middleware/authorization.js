const createError = require('http-errors');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(createError(403, '로그인이 필요합니다'));
  }
};

exports.isLoggedIn = isLoggedIn;
