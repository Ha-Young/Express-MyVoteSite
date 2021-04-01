const Joi = require('joi');
const createError = require('http-errors');
const {
  signupErrorMessage,
  loginErrorMessage,
  createVotingErrorMessage
} = require('../constants/joiErrorMessage');

exports.signupSchema = function (req, res, next) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .error(new Error(signupErrorMessage.INVALID_EMAIL)),
    name: Joi.string()
      .min(4)
      .alphanum()
      .required()
      .error(new Error(signupErrorMessage.INVALID_NAME)),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"))
      .required()
      .error(new Error(signupErrorMessage.INVALID_PASSWORD)),
    passwordConfirm: Joi.string()
      .min(8)
      .valid(Joi.ref('password'))
      .required()
      .error(new Error(signupErrorMessage.INVALID_PASSWORDCONFIRM)),
  });

  validateRequest(req, res, next, schema, '/signup');
};

exports.loginSchema = function (req, res, next) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .error(new Error(loginErrorMessage.INVALID_EMAIL)),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"))
      .required()
      .error(new Error(loginErrorMessage.INVALID_PASSWORD)),
  });

  validateRequest(req, res, next, schema, '/login');
};

exports.createVotingSchema = function (req, res, next) {
  const schema = Joi.object({
    title: Joi.string()
      .required()
      .error(new Error(createVotingErrorMessage.INVALID_TITLE)),
    userOptions: Joi.array()
      .min(2)
      .max(9)
      .required()
      .error(new Error(createVotingErrorMessage.INVALID_OPTION)),
    expiration_date: Joi.date()
      .greater('now')
      .required()
      .error(new Error(createVotingErrorMessage.INVALID_EXPIRATION_DATE)),
  });

  validateRequest(req, res, next, schema, '/votings/new');
};

async function validateRequest(req, res, next, schema, redirectPath) {
  const options = {
      abortEarly: true,
      allowUnknown: true
  };

  try {
    await schema.validateAsync(req.body, options);

    next();
  } catch (err) {
    req.flash('userInput', req.body);
    req.flash('errors', getErrorType(err));

    res.redirect(redirectPath);
  }
}

function getErrorType (err) {
  switch (err.message) {
    case signupErrorMessage.INVALID_EMAIL:
      return { email: {
        message: err.message
      }};
    case signupErrorMessage.INVALID_NAME:
        return { name: {
          message: err.message
        }};
    case signupErrorMessage.INVALID_PASSWORD:
      return { password: {
        message: err.message
      }};
    case signupErrorMessage.INVALID_PASSWORDCONFIRM:
      return { passwordConfirm: {
        message: err.message
      }};
    case loginErrorMessage.INVALID_EMAIL:
      return { email: {
        message: err.message
      }};
    case loginErrorMessage.INVALID_PASSWORD:
      return { password: {
        message: err.message
      }};
    case createVotingErrorMessage.INVALID_TITLE:
      return { title: {
        message: err.message
      }};
    case createVotingErrorMessage.INVALID_OPTION:
      return { option: {
        message: err.message
      }};
    case createVotingErrorMessage.INVALID_EXPIRATION_DATE:
      return { expiration_date: {
        message: err.message
      }};
  }
}
