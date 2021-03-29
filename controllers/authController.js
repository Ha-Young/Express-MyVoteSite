exports.getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
exports.postLogin = (req, res) => {
  passport.authenticate("custom-name", {
    failureRedirect: "/login" }),
    (err, req, res, next) => {
    if (err) {
      console.log(err);
      next(err);
      return;
    }
    console.log("You are logged in!");
    res.redirect("/");
  }
};

exports.getSignup = (req, res) => {
  res.render("signup", { pageTitle: "Signup" });
};
exports.postSignup = (req, res) => {
};
