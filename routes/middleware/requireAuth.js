
function requireAuth(req, res, next) {
  if (req.session.passport) {
    return next();
  }

  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
}

exports.requireAuth = requireAuth;