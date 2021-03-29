const passport = require("passport");

const User = require("../../models/User");

const AUTH = require("../../constants/authConstants");

const Controller = {};

// @route   GET auth/signup
// @desc    Render singup page
// @access  Public
Controller.getSignup = (req, res) => {
  res.render("signup");
};

// @route   POST auth/signup
// @desc    save UserInfo mongoDB
// @access  Public
Controller.postSignup = async (req, res, next) => {
  const { email, password, checkingPassword } = req.body;

  try {
    const checkedUser = await User.findOne({ email });

    if (checkedUser) {
      return res.render("error", { message: AUTH.EXISTING_USER });
    }

    if (password.legnth < AUTH.PASSWORD_MIN_LENGTH) {
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

// @route   GET auth/login
// @desc    Render login page
// @access  Public
Controller.getLogin = (req, res) => {
  res.render("login");
};

// @route   POST auth/login
// @desc    authenticate user
// @access  Public
Controller.postLogin = passport.authenticate("local", {
  failureRedirect: "/auth/login",
  successRedirect: "/",
});

module.exports = Controller;
