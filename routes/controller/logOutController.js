exports.handleLogOut = function (req, res, next) {
  res.clearCookie("jwt").redirect("/votings");
};
