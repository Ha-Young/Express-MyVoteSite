function authenticateUser(req, res, next) {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.status(301).redirect("/auth/login");
}

module.exports = authenticateUser;
