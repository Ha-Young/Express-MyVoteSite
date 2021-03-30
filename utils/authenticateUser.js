const catchAsync = require("./catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
    return;
  }

  next();
});
