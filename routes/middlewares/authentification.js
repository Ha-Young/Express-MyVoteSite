function isAuthenticated(req, res, next) {
  try {
    if (req.isAuthenticated()) return next();

    res.redirect('/login');
  } catch (err) {
    next(err);
  }
}

module.exports = isAuthenticated;
