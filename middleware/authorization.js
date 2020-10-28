const constants = require('../constants');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.session.redirectUrl = req.originalUrl;
    console.log(req.originalUrl)
    req.flash('errorMessage', constants.ERROR_MESSAGE_LOGIN);
    res.redirect('/login');
  }
};

exports.isLoggedIn = isLoggedIn;
