const { check, validationResult } = require('express-validator');

exports.validator = [
  check('email')
    .isEmail()
    .withMessage('must entered an valid email address'),
  check('nickname')
    .not()
    .isEmpty()
    .withMessage('nickName is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('must be at least 6 chars long')
    .matches(/\d/)
    .withMessage('must contain a number'),
  check('passwordConfirmation')
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        console.log('password')
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      next();
    } else {
      const invalidErrors = errors.array();
      res.render('signup', { invalidErrors });
    }
  }
];

