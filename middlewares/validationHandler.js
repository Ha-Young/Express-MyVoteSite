const {
  validateLoginInputs,
  validateSignUpInputs,
  validateQueries,
  validateNewVoteInputs,
  validateVoteInputs
} = require('../utils/validateInputs');
const User = require('../models/User');
/**
 * validate inputs from form
 * @param {incomingMessage} request - request from client
 * @param {serverresponse} response - response from server
 * @param {function} next - function to move next middleware
 * @returns {undefined} does not have any return value
 */
exports.validateSignup = async (req, res, next) => {
  const { error, value } = validateSignUpInputs(req.body);

  if (error) {
    req.flash('info', error.details.map(err => err.message));
    return res.redirect('/auth/signup');
  }

  try {
    if (await User.findOne({ email: value.email })) {
      req.flash('error', 'email already exist');
      return res.redirect('/auth/signup');
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

exports.validateLogin = (req, res, next) => {
  const { error } = validateLoginInputs(req.body);

  if (error) {
    req.flash('info', error.details.map(err => err.message));
    return res.redirect('/auth/login');
  }

  return next();
};

exports.validateQuery = (req, res, next) => {
  const { error } = validateQueries(req.query);

  if (error) {
    return res.redirect('back');
  }

  return next();
};

exports.validateNewVote = (req, res, next) => {
  const { error } = validateNewVoteInputs(req.body);

  if (error) {
    req.flash('info', error.details.map(err => err.message));
    return res.redirect('/votings/new');
  }

  return next();
};

exports.validateVote = (req, res, next) => {
  const { error } = validateVoteInputs(req.body);

  if (error) {
    req.flash('info', error.details.map(err => err.message));
    return res.redirect(`/votings/${req.params.id}`);
  }

  return next();
};
