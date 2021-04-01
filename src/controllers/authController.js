const User = require("../models/User");
const { generatePassword } = require("../utils/passwordHelper");

exports.getLogin = (req, res) => {
  const queryKey = Object.keys(req.query);
  const loginErrorMessage = req.flash("error");

  res.render("login", {
    pageTitle: "Login",
    nextPage: {
      key: queryKey,
      value: req.query[queryKey],
    },
    loginErrorMessage,
  });
};
exports.postLogin = (req, res) => {
  const queryKey = Object.keys(req.query);

  if (queryKey.length) {
    res.redirect(`/${queryKey}/${req.query[queryKey]}`);
    return;
  }

  res.redirect("/");
};

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
