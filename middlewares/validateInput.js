const Joi = require('joi');
const {
  signupErrorMessage,
  loginErrorMessage,
  createVotingErrorMessage
} = require('../constants/joiErrorMessage');
const { getErrorType } = require('../utils');

// TODO error 종류에 따라서 다른 에러메시지를 던지는것도 괜찮을듯??
//+ 지금은 옵션에서 얼리abort시켜놔서 에러 한개만 잡히는데 여러개 잡아도 좋을듯

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
