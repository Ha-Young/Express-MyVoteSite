const { body, validationResult } = require('express-validator');
const { ValidationError } = require('../lib/errors');
const validationMessages = require('../lib/validationMessages');

// const PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$";

const userValidationRules = () => {
  return [
    body('username').isLength({ min: 4 }).withMessage(validationMessages.USERNAME),
    body('firstname').exists().withMessage(validationMessages.FIRSTNAME),
    body('lastname').exists().withMessage(validationMessages.LASTNAME),
    body('email').isEmail().withMessage(validationMessages.EMAIL),
    body('password').isLength({ min: 10 }).withMessage(validationMessages.PASSWORD),
    // body('password').matches(PASSWORD_REGEX).withMessage(validationMessages.PASSWORD),
    body('confirm_password').custom((confirmationPassword, { req }) => {
      if (confirmationPassword !== req.body.password) {
        throw new Error(validationMessages.PASSWORD_CONFIRMATION);
      }
      return true;
    })
  ];
};

const validateUser = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorMessages = errors.array().map(err => err.msg);

  req.flash('Signup Error Message', errorMessages[0]);
  res.redirect('/signup');
};

module.exports = {
  userValidationRules,
  validateUser
};
