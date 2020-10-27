exports.verifyLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }

  return res.redirect('/login');
};
