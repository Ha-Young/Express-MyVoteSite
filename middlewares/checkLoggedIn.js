const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

module.exports = catchAsync(async (req, res, next) => {
  const clientToken = req.cookies.jwt;
  res.locals.isLoggedIn = true;

  if (!clientToken || clientToken === "loggedout") {
    res.locals.isLoggedIn = false;
    return next();
  }

  const decoded = await jwt.verify(clientToken, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    res.locals.isLoggedIn = false;
    return next();
  }

  req.user = currentUser;
  res.locals.user = currentUser;

  next();
});
