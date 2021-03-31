const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const catchAsync = require("../../utils/catchAsync");

const handleInvalidToken = (req, next) => {
  req.user = null;
  return next();
};

module.exports = catchAsync(async (req, res, next) => {
  if (!req.cookies.voting_platform) {
    return handleInvalidToken(req, next);
  }

  const decoded = jwt.verify(req.cookies.voting_platform, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).lean();

  if (!user) {
    return handleInvalidToken(req, next);
  }

  req.user = user;
  next();
});
