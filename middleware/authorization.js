const constants = require('../constants');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.session.redirectUrl = req.originalUrl;
    if (req.method === 'PUT' || req.method === 'DELETE') {
      return res.json({ message: constants.ERROR_MESSAGE_REQUEST_FAIL});
    }
    res.redirect('/login');
  }
};

exports.isLoggedIn = isLoggedIn;
