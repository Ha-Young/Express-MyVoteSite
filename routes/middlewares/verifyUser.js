function verifyUser(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/")
      return;
    }

    next();
}

module.exports = verifyUser;
