const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const catchAsync = require("../../utils/catchAsync");

exports.renderSignupPage = (req, res, next) => {
  res.locals.message = req.flash("message")[0] || null;
  res.locals.user = req.user;
  res.render("signup");
};

exports.signup = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    password,
    passwordConfirm,
  } = req.body;

  if (!name || !email || !password || !passwordConfirm) {
    req.flash("message", "Provide all informations.");
    res.redirect("/auth/signup");
    return;
  }

  await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  res.redirect("/auth/login");
});

exports.renderLoginPage = (req, res, next) => {
  res.locals.message = req.flash("message")[0] ?? null;
  res.locals.user = req.user;
  res.render("login");
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash("message", "Provide email and password.");
    res.redirect("/auth/login");
    return;
  }

  const user = await User.findOne({ email }).select("+password");
  const correct = await user?.correctPassword(req.body.password, user.password);

  if (!user || !correct) {
    req.flash("message", "Incorrect email or password.");
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

exports.logout = (req, res, next) => {
  res.clearCookie("voting_platform");
  res.redirect("/");
};
