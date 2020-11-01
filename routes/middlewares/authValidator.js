const { body, check, validationResult } = require('express-validator');
const { ROUTES, ERROR, MESSAGES } = require('../../config/constants');

exports.validateSignUp = [
  checkEmail(),
  checkPasswordExists(),
  checkPasswordLength(),
  checkConfirmation()
];
exports.validateLogin = [checkEmail(), checkPasswordLength()];

exports.checkVaildationError = function checkVaildationError(req, res, next) {
  const errors = validationResult(req);
  const isErrors = !errors.isEmpty();

  if (isErrors) {
    req.flash(ERROR, errors.array()[0].msg);
    return res.redirect(`${ROUTES.AUTH}${req.url}`);
  }
  next();
};

function checkEmail() {
  return body('email').isEmail().withMessage(MESSAGES.EMAIL_INVAILD);
}

function checkPasswordLength() {
  return body('password').isLength({ min: 4 }).withMessage(MESSAGES.PASSWORD_MINIMUM_LENGTH);
}

function checkPasswordExists() {
  return check('password').exists();
}

function checkConfirmation() {
  return check('passwordConfirmation', MESSAGES.PASSWORD_CONFIRMATION_MISMATCH)
    .exists()
    .custom((value, { req }) => value === req.body.password);
}
