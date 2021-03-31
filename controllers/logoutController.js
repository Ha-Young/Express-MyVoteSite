exports.logout = (req, res) => {
  res.cookie("access_token", "", { maxAge: 1 });

  res.redirect(301, "/login");
};
