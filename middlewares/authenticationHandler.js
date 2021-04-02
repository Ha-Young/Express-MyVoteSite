/**
 * if user is not logged in, then redirect to login page
 * @param {incomingMessage} request - request from client
 * @param {serverresponse} response - response from server
 * @param {function} next - function to move next middleware
 * @returns {undefined} does not have any return value
 */
exports.authenticateVotes = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  if (req.method === 'POST' && req.baseUrl.includes('votings') && req.params.id) {
    req.flash('error', 'Please login to use services');
    req.flash('redirect', `/votings/${req.params.id}`);
  }

  return res.redirect('/auth/login');
};

exports.authenticateAuth = (req, res, next) => {
  if (req.path.includes('logout')) {
    if (req.isAuthenticated()) {
      return next();
    }

    return res.redirect('back');
  }

  if (req.isAuthenticated()) {
    return res.redirect('back');
  }

  return next();
};

exports.authenticateIndex = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/auth/login');
};
