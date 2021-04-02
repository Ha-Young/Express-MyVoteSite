const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

module.exports.isSignIn = async function isSignIn(req, res, next) {
  const now = Date.now().valueOf() / 1000;
  const accessToken = req.cookies["access"];
  const refreshToken = req.cookies["refresh"];

  if (!accessToken || !refreshToken) {
    return next();
  }

  const dcdAccessToken = jwt.decode(accessToken);
  const dcdRefreshToken = jwt.decode(refreshToken);

  if (!dcdAccessToken || dcdAccessToken.exp < now) {
    if (!dcdRefreshToken || dcdRefreshToken.exp < now) {
      return next();
    }

    const refreshTargetUser = await User.findById(dcdRefreshToken._id).lean();

    if (refreshTargetUser.email !== dcdAccessToken.email) {
      return next();
    }

    const newAccessToken = jwt.sign({
      email: refreshTargetUser.email
    },
    process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.cookie("access", newAccessToken);
  }

  const { email } = jwt.decode(req.cookies["access"]);
  const user = await User.findOne({ email }).lean();
  req.user = user;

  next();
}

module.exports.redirectIfUserNone = function redirectIfUserNone(req, res, next) {
  if (!req.user) {
    return res.redirect("/signin");
  }

  next();
}

module.exports.responseIfUserNone = function responseIfUserNone(req, res, next) {
  if (!req.user) {
    res.cookie("originalUrl", req.originalUrl);
    return res.json("none");
  }

  next();
}
