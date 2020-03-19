module.exports = authenticateLogin = (req, res, next) => {
  // console.log(req.session)
  console.log(req.session)
    req.session.returnTo = req.originalUrl; 
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/auth/login');
};