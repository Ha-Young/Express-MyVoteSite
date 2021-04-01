const jwt = require("jsonwebtoken");
const {
  AUTH_ROUTE,
  SIGNUP,
  LOGIN,
  ROOT_ROUTE,
  VOTINGS_ROUTE,
} = require("../../constants");

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
    res.redirect(AUTH_ROUTE + SIGNUP);
    return;
  }

  await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  res.redirect(AUTH_ROUTE + LOGIN);
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
    res.redirect(AUTH_ROUTE + LOGIN);
    return;
  }

  const user = await User.findOne({ email }).select("+password");
  const correct = await user?.correctPassword(password, user.password);

  if (!user || !correct) {
    req.flash("message", "Incorrect email or password.");
    res.redirect(AUTH_ROUTE + LOGIN);
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const location = req.flash("location")[0] || null;

  res.cookie("voting_platform", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  location
    ? res.redirect(`${VOTINGS_ROUTE}/${location}`)
    : res.redirect(ROOT_ROUTE);
});

exports.logout = (req, res, next) => {
  res.clearCookie("voting_platform");
  res.redirect(ROOT_ROUTE);
};
