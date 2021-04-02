const passport = require("passport");

exports.getLoginPage = async function(req, res, next) {
  res.render(
    "login",
    { title: "Login",
      error: req.flash("error")
    }
  );
};

exports.directUserToRelevantPage = async function(req, res, next) {
  passport.authenticate(
    "local", {
      failureRedirect: "/login",
      successRedirect: req.session.returnTo || "/",
      failureFlash: true,
  })(req, res, next);
};