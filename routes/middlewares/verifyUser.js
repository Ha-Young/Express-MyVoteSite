function verifyUser(req, res, next) {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  req.session.returnTo = req.originalUrl;
  res.json("no user");
}

module.exports = verifyUser;
