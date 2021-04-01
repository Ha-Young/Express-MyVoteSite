const passport = require("passport");

exports.directUserToRelevantPage = async function(req, res, next) {
  passport.authenticate(
    "local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next);
};

exports.getLoginPage = async function(req, res, next) {
  res.render("login", { title: "Login",  error: req.flash("error") });
};
