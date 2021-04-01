const passport = require("passport");

const User = require("../../models/User");

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

    const emailRegex = new RegExp("([\\w-\\.]+)@((?:[\\w]+\\.)+)([a-zA-Z]{2,4})");

    if (!emailRegex.test(email)) {
      return res.render("error", { message: AUTH.EMAIL_FORMAT });
    }

    if (password.length !== checkingPassword.length) {
      return res.render("error", { message: AUTH.DIFFERENT_PASSWORD });
    }

    const user = await User({ email });

    const passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[a-zA-z]).{8,15}$");

    if (!passwordRegex.test(password)) {
      return res.render("error", { message: AUTH.WORNG_PASSWORD_MESSAGE });
    }

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
