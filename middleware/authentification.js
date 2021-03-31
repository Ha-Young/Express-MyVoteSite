const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports.authToken = passport.authenticate("jwt", { session: false });

module.exports.isSignIn = function isSignIn(req, res, next) {
  const now = Date.now().valueOf() / 1000;
  const accessToken = req.cookies["access"];
  const refreshToken = req.cookies["refresh"];

  if (!accessToken || !refreshToken) {
    return next();
  }

  const dcdAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET);
  const dcdRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET);

  if (!dcdAccessToken || dcdAccessToken.exp < now) {
    // access token이 만료됨
    if (!dcdRefreshToken || dcdRefreshToken.exp > now) {
      // 만료됨
      console.log("token expired : ");
      return next();
    }

    const refreshTargetUser = User.findById(dcdRefreshToken._id).lean();

    if (refreshTargetUser.email !== dcdAccessToken.email) {
      console.log("token not same : ");
      return next();
    }

    const newAccessToken = jwt.sign({
      email: refreshTargetUser.email
    },
    process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    // 새로운 액세스 토큰 발급
    res.cookie("access", newAccessToken);
  }

  const { email } = req.cookies["access"];
  const user = User.findOne({ email }).lean();

  req.user = user;
  next();
}

module.exports.redirectIfUserNone = function redirectIfUserNone(req, res, next) {
  if (!req.user) {
    return res.redirect("/signin");
  }

  next();
}
