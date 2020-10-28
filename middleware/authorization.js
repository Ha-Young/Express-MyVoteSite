const constants = require('../constants');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.session.redirectUrl = req.originalUrl;
    if (req.body.name === 'ajax') {
      return res.json({ message: constants.ERROR_MESSAGE_FAIL_VOTING });
    }
    res.redirect('/login');
  }
};

exports.isLoggedIn = isLoggedIn;
