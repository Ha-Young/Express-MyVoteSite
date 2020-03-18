const Users = require('../models/Users');

module.exports = checkAuthentication = async (req, res, next) => {
  const loggedInUser = await Users.findById(req.user);
  res.locals.loggedInUser = loggedInUser;

  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/auth/login');
};
