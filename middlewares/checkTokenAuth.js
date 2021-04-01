const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");

module.exports = catchAsync(async (req, res, next) => {
  const clientToken = req.cookies.jwt;

  if (!clientToken || clientToken === "loggedout") {
    return res.status(200).redirect("/users/login");
  }

  const decoded = await jwt.verify(clientToken, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return res.status(200).redirect("/users/login");
  }

  if (req.originalUrl.includes("users")) {
    return res.status(200).redirect("/");
  }

  req.user = currentUser;
  next();
});
