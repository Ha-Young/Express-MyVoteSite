const { validateLoginInputs, validateSignUpInputs } = require('../utils/validateInputs');
/**
 * validate inputs from form
 * @param {incomingMessage} request - request from client
 * @param {serverresponse} response - response from server
 * @param {function} next - function to move next middleware
 * @returns {undefined} does not have any return value
 */
exports.signup = (req, res, next) => {
  const { error } = validateSignUpInputs(req.body);

  if (error) {
    req.flash('info', error.details.map(err => err.message));
    return res.redirect('/auth/signup');
  }

  return next();
}

exports.login = (req, res, next) => {
  const { error } = validateLoginInputs(req.body);

  if (error) {
    req.flash('info', error.details.map(err => err.message));
    return res.redirect('/auth/login');
  }

  return next();
}
