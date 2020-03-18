function checkUser(req, res, next) {
  if (!req.user) return res.redirect('/auth/login');

  next();
}

module.exports = checkUser;
