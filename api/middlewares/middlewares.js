exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(403).render('error');
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
};