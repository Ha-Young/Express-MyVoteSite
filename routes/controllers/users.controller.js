const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../../util/jwtHelper");
const createError = require("http-errors")

exports.signUp = async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    await user.save();
    res.status(201).redirect("/users/login");
  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const accessToken = generateAccessToken(user, process.env.ACCESS_TOKEN_SECRET, "30m");
    const refreshToken = generateAccessToken(user, process.env.REFRESH_TOKEN_SECRET, "14d");

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
};

exports.signOut = (req, res, next) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).end();
};
