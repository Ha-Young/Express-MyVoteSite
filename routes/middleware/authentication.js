exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
};

exports.isAuthenticatedAjax = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json({ fail: '로그아웃 되었습니다. 다시 로그인해주세요.' });
};
