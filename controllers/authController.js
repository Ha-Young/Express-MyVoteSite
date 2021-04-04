exports.getLoginPage = function(req, res, next) {
  res.render(
    "login",
    { title: "Login",
      loginMessage: req.flash("loginMessage")
    }
  );
};

exports.directUserToRelevantPage = function(req, res, next) {
  if (req.session.returnTo) {
    res.redirect(req.session.returnTo);
  } else {
    res.redirect("/");
  }
};

exports.getLogOut = function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};
