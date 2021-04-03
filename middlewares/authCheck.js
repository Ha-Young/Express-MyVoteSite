const createError = require('http-errors');

const authCheck = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next(createError({
      url: '/auth/login',
      isRedirected: true,
      message: '로그인이 필요합니다. 로그인 페이지로 이동합니다.',
    }));
  }
  return next();
};

exports.authCheck = authCheck;
