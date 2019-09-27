const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', '로그인이 필요합니다.');
  res.status(401).redirect('/users/login');
};

const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.status(301).redirect('/');
};

module.exports = {
  ensureAuthenticated,
  forwardAuthenticated,
};
