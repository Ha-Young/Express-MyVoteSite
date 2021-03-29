const passport = require("passport");

const User = require("../../models/User");

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
  const { email, password } = req.body;

  try {
    const checkedUser = await User.findOne({ email });

    if (checkedUser) {
      return res.render("error", { message: "이미 가입된 정보입니다." });
    }

    const user = await User({ email });

    await User.register(user, password);
    next();
  } catch (error) {
    console.log(error.message);
    res.render("error", { message: "회원가입에 실패했습니다. 다시 시도해주세요" });
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
