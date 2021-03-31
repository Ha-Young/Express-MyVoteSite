const passport = require("passport");
const User = require("../models/User");
const { generatePassword } = require("../utils/passwordHelper");

exports.getLogin = (req, res) => {
  const queryKey = Object.keys(req.query);
console.log(queryKey)
  res.render("login", {
    pageTitle: "Login",
    nextPage: {
      key: queryKey,
      value: req.query[queryKey],
    },
  });
};
exports.postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
});

exports.getSignup = (req, res) => {
  res.render("signup", { pageTitle: "Signup" });
};
exports.postSignup = async (req, res) => {
  const { username, email, password1: password } = req.body;

  await User.create({
    username,
    email,
    ...generatePassword(password),
  });

  res.redirect("/auth/login");
};
