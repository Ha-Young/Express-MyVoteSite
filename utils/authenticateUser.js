const jwt = require("jsonwebtoken");

const User = require("../models/User");
const catchAsync = require("./catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  if (!req.cookies.voting_platform) {
    res.redirect("/auth/login");
    return;
  }

  const decoded = jwt.verify(req.cookies.voting_platform, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).lean();

  if (!user) {
    res.redirect("/auth/login");
    return;
  }

  req.user = user;
  next();
});
