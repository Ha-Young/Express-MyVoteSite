/**
 * if user is not logged in, then redirect to login page
 * @param {incomingMessage} request - request from client
 * @param {serverresponse} response - response from server
 * @param {function} next - function to move next middleware
 * @returns {undefined} does not have any return value
 */
exports.votes = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('error', 'Please login to use services');
  req.flash('redirect', `/votings/${req.params.id}`);
  return res.redirect('/auth/login');
};

exports.auth = (req, res, next) => {
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
