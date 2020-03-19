module.exports = (req, res, next) => {
    req.session.returnTo = req.originalUrl; 
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/auth/login');
};
