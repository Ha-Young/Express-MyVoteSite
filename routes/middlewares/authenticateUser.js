const catchAsync = require("../../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  if (req.user) {
    return next();
  }

  req.flash("location", req.params.id);
  res.redirect("/auth/login");
});
