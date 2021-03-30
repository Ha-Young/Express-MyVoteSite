exports.home = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.myVotings = (req, res) => {
  res.render("myVoting", { pageTitle: "My Votings" });
};
