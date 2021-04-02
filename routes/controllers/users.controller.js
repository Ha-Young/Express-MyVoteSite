const User = require("../../models/User");
const { generateToken } = require("../../util/jwtHelper");
const createError = require("http-errors")

exports.signUp = async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    await user.save();
    res.status(201).end();
  } catch (err) {
    next(createError(500, "이런.. 문제가 발생했습니다."));
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const accessToken = generateToken(user, process.env.ACCESS_TOKEN_SECRET, "2h");
    const refreshToken = generateToken(user, process.env.REFRESH_TOKEN_SECRET, "14d");

    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;
    res.status(200).end();
  } catch (err) {
    next(createError(500, "이런.. 문제가 발생했습니다."));
  }
};

exports.signOut = (req, res, next) => {
  req.session = null;
  req.logout();
  res.status(200).end();
};
