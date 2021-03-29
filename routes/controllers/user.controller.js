const passport = require("passport");

const User = require("../../models/User");

exports.getSignUp = (req, res, next) => {
  res.status(200).render("signup", { message: "" });
};

exports.getLogIn = (req, res, next) => {
  res.status(200).render("login");
};

exports.postSignUp = async (req, res, next) => {
  try {
    const user = User(req.body);

    await user.validate();
    await user.save();

    res.status(302).redirect("/login");
  } catch (error) {
    next(error);
  }
};

exports.postLogIn = passport.authenticate("local", { failureRedirect: "/login", successRedirect: "/" });

exports.getGitHubLogIn = passport.authenticate("github");
exports.getGitHubCallback = passport.authenticate("github", {
  failureRedirect: "/login",
  successRedirect: "/",
});
