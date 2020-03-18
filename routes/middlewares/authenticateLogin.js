module.exports = authenticateLogin = (req, res, next) => {
  console.log(22222222222222)
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/auth/login');
};