const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.render('login', {
      isLogined: req.session.isLogined,
      message: '로그인이 필요합니다'
    });
  }
};

exports.isAuthenticated = isAuthenticated;
