const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");

exports.renderSignupPage = (req, res, next) => {
  res.render("signup");
};

exports.signup = catchAsync(async (req, res, next) => {
  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.redirect("/auth/login");
});

exports.renderLoginPage = (req, res, next) => {
  res.render("login");
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.locals.message = "Provide email and password.";
    res.redirect("/auth/login");
    return;
  }

  const user = await User.findOne({ email }).select("+password");
  const correct = await user?.correctPassword(req.body.password, user.password);

  if (!user || !correct) {
    res.locals.message = "Incorrect email or password.";
    res.redirect("/auth/login");
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("voting_platform", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  res.redirect("/");
});
