const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURICompnent('로그인한 상태입니다.');
    res.redirect('/');
  }
};

module.exports = isNotLoggedIn;
