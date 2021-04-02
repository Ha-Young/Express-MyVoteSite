function verifyAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.redirect("/login");
}

module.exports = verifyAuth;
