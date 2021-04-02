const passport = require("passport");

const User = require("../../models/User");
const validationPassword = require("../../utils/validationPassword");
const validationEmail = require("../../utils/validationEmail");

const AUTH = require("../../constants/authConstants");

const Controller = {};

Controller.getSignup = (req, res) => {
  res.render("signup");
};

Controller.postSignup = async (req, res, next) => {
  const { email, password } = req.body;
  const checkingPassword = req.body["check-password"];

  try {
    const checkedUser = await User.findOne({ email });

    if (checkedUser) {
      return res.render("error", { message: AUTH.EXISTING_USER });
    }

    const passwordValidation = validationPassword(password, checkingPassword);
    const emailValidation = validationEmail(email);

    if (passwordValidation || emailValidation) {
      return res.render("error", { message: passwordValidation || emailValidation });
    }

    const user = await User({ email });

    await User.register(user, password);
    next();
  } catch (error) {
    console.error(error.message);
    res.render("error", { message: AUTH.FAIL_REGISTER });
  }
};

Controller.getLogin = (req, res) => {
  res.render("login");
};

Controller.postLogin = (req, res) => {
  const votingUrl = req.cookies.votingUrl;
  const successUrl = votingUrl ? `/voting/votings/${votingUrl}` : "/";

  res.clearCookie("votingUrl");

  passport.authenticate("local", {
    successRedirect: successUrl,
    failureRedirect: "/auth/login",
  })(req, res);
};

Controller.getLogout = (req, res) => {
  req.logOut();
  res.status(301).redirect("/");
};

module.exports = Controller;
