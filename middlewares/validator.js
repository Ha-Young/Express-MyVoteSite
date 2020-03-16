const { body, validationResult } = require('express-validator');
const { ValidationError } = require('../lib/errors');

const userValidationRules = () => {
  return [
    body('username').isLength({ min: 4 }).withMessage('username should be longer than 4 characters.'),
    body('firstname').isLength({ min: 1 }).withMessage('firstname is required.'),
    body('lastname').isLength({ min: 1 }).withMessage('lastname is required.'),
    body('email').isEmail().withMessage('not a valid email.'),
    body('password').isLength({ min: 10 }).withMessage('password should be longer than 10 characters.'),
    body('confirm_password').custom((confirmationPassword, { req }) => {
      if (confirmationPassword !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }

      return true;
    })
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorMessages = [];
  errors.array().map(err => errorMessages.push(err.msg));

  next(new ValidationError(errorMessages));
};

module.exports = {
  userValidationRules,
  validate
};
