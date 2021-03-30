exports.home = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/auth/login");
};
