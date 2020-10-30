const { check } = require('express-validator');

const signup = [
  check('displayName')
    .isLength({ min: 2 })
    .withMessage('Display Name은 최소 2글자 이상이어야 합니다')
    .isLength({ max: 10 })
    .withMessage('Display Name은 최대 10글자 이하이어야 합니다'),

  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('유효하지않은 이메일 입니다')
    .bail(),

  check('password')
    .isLength({ min: 4 })
    .withMessage('비밀번호는 최소 4글자 이상이어야 합니다')
    .matches('[0-9]')
    .withMessage('하나 이상의 숫자를 반드시 포함해야 합니다')
    .custom((password, { req, location, path }) => {
      if (password !== req.body.confirmPassword) return false;
      return password;
    })
    .withMessage('패스워드가 일치하지 않습니다'),
];

module.exports = { signup };
