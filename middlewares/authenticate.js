const Users = require('../models/Users');

module.exports = checkAuthentication = async (req, res, next) => {
  const currentUser = await Users.findById(req.user);
  res.locals.currentUser = currentUser;

  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/auth/login');
};
