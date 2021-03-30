exports.renderLogInPage = function (req, res, next) {
  res.status(200).render("login", { messages: req.flash("loginError") });
};
