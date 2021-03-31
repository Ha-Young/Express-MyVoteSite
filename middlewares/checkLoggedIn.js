// const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
// const User = require("./../models/userModel");

module.exports = catchAsync(async (req, res, next) => {
  const clientToken = req.cookies.jwt;

  if (clientToken && req.originalUrl.includes("users")) {
    return res.status(200).redirect("/");
  }

  next();
});
