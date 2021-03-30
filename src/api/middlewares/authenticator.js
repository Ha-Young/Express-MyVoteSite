exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.redirect("/auth/login");
};

exports.authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
    return;
  }

  next();
};
