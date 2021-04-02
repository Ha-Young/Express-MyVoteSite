function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
}

exports.requireAuth = requireAuth;
