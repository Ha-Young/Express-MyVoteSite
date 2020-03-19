exports.authorization = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
    next()
  }
};