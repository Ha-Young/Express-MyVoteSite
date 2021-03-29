const forwardAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    //res.locals.user = DB의 유저 이름 정보
    return next();
  }
  res.redirect('/login');
};

module.exports = forwardAuthenticated;
