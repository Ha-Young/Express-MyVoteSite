const { body, check, validationResult } = require('express-validator');
const { ROUTES, ERROR } = require('../../config/constants');

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
  return body('email').isEmail().withMessage('Ivaild E-mail input type');
}

function checkPasswordLength() {
  return body('password').isLength({ min: 4 }).withMessage('Password must be at least 4');
}

function checkPasswordExists() {
  return check('password').exists();
}

function checkConfirmation() {
  return check('passwordConfirmation', 'Password fields must have the same value')
    .exists()
    .custom((value, { req }) => value === req.body.password);
}
