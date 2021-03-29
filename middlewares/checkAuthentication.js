/**
 * if user is not logged in, then redirect to login page
 * @param {incomingMessage} request - request from client
 * @param {serverresponse} response - response from server
 * @param {function} next - function to move next middleware
 * @returns {undefined} does not have any return value
 */
const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/auth/login');
}

module.exports = checkAuthentication;
