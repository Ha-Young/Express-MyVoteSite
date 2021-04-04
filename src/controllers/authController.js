const createError = require("http-errors");
const User = require("../models/User");
const { generatePassword } = require("../utils/passwordHelper");

exports.getLogin = (req, res) => {
  const queryKey = Object.keys(req.query)[0];
  const errorMessage = req.flash("error");

  console.log(req.query, queryKey, req.query[queryKey])

  const renderOption = {
    pageTitle: "Login",
    nextPage: {
      key: queryKey,
      value: req.query[queryKey],
    },
    errorMessage,
  };

  res.status(200).render("login", renderOption);
};

exports.postLogin = (req, res) => {
  const queryKey = Object.keys(req.query);
  const redirectUrl = `/${queryKey}/${req.query[queryKey]}`;

  if (queryKey.length) {
    res.status(301).redirect(redirectUrl);
    return;
  }

  res.status(301).redirect("/");
};

exports.getSignup = (req, res) => {
  const errorMessage = req.flash("error");
  const renderOption = {
    pageTitle: "Signup",
    errorMessage,
  };

  res.status(200).render("signup", renderOption);
};

exports.postSignup = async (req, res, next) => {
  const {
    username,
    email,
    password1: password,
  } = req.body;

  try {
    await User.create({
      username,
      email,
      ...generatePassword(password),
    });

    res.status(301).redirect("/auth/login");
  } catch (err) {
    console.log("Failed create user", err);
    next(createError(500));
  }
};
