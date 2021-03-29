const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect("/auth/login");
  }
};

module.exports = authenticateUser;
