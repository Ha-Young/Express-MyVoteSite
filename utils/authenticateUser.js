const catchAsync = require("./catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  if (req.user) {
    return next();
  }

  res.redirect("/auth/login");
});
