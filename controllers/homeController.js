const User = require("../models/User");

exports.getHomePage = async function(req, res, next) {
  console.log(req.user,"hummmm")

  const displayName = req.user ? req.user.userName : null;
  res.render("index", { title: 'Home', displayName, error: req.flash("error") });
}

