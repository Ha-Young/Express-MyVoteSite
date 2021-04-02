const Joi = require('joi');
const {
  signupErrorMessage,
  loginErrorMessage,
  createVotingErrorMessage
} = require('../constants/joiErrorMessage');
const { getErrorMessage } = require('../utils');

exports.signupValidation = function (req, res, next) {
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

exports.loginInputValidation = function (req, res, next) {
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

exports.createVotingInputValidation = function (req, res, next) {
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
    req.flash('errors', getErrorMessage(err));

    res.redirect(redirectPath);
  }
}
