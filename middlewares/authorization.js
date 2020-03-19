function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(302).redirect('/users/login');
}

exports.ensureAuthenticated = ensureAuthenticated;
