const passport = require("passport");

exports.authenticate = passport.authenticate('local', {
  failureRedirect: '/auth/login',
  failureFlash: "존재하지 않는 사용자 이거나 잘못된 값이 입력되었습니다.",
 });

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.redirect("/");
};

exports.authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
    return;
  }

  next();
};
