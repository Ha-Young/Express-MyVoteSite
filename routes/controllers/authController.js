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

    if (password.length < AUTH.PASSWORD_MIN_LENGTH) {
      return res.render("error", { message: AUTH.PASSWORD_MIN_LENGTH_MESSAGE });
    }

    const user = await User({ email });

    if (password !== checkingPassword) {
      return res.render("error", { message: AUTH.DIFFERENT_PASSWORD });
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

Controller.postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
});

Controller.getLogout = (req, res) => {
  req.logOut();
  res.status(301).redirect("/");
};

module.exports = Controller;
