function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(302).redirect('/login');
}

exports.ensureAuthenticated = ensureAuthenticated;
