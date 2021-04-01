const createError = require('http-errors');

const authCheck = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(createError(401, '로그인이 필요합니다.'));
  }
  next();
};

exports.authCheck = authCheck;
