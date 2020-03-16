const { body, validationResult } = require('express-validator');
// const { username, email, firstname, lastname, email, password, confirm_password, gender } = req.body;

const userValidationRules = () => {
  return [
    body('username').isLength({ min: 4 }),
    body('firstname').isLength({ min: 1 }),
    body('lastname').isLength({ min: 1 }),
    body('email').isEmail(),
    body('password').isLength({ min: 10 })
  ];
};

const validate = async (req, res, next) => {
  const errors = validationResult(req);
  console.log('bool', errors.isEmpty());
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return next(extractedErrors); // 에러가 발생하면 error를 넘겨주기
};

module.exports = {
  userValidationRules,
  validate
};
