const Users = require("../models/Users");

module.exports = checkAuthentication = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const loggedInUser = await Users.findById(req.user._id);
    res.locals.loggedInUser = loggedInUser;

    return next();
  }

  req.session.returnTo = req.originalUrl;
  res.redirect("/auth/login");
};
