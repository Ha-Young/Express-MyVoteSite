function verifyAuth(req, res, next) {
    if (req.isAuthenticated()) {
      next();
      return;
    }

    res.redirect("/");
  }

module.exports = verifyAuth;
