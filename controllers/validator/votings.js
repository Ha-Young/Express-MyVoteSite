const { check } = require('express-validator');
const { isPast } = require('date-fns');

const { parseUserInputs } = require('../../util/voting');

const createVoting = [
  check('topic')
    .isLength({ min: 2 })
    .withMessage('Topic은 최소 2글자 이상이어야 합니다')
    .isLength({ max: 15 })
    .withMessage('Topic은 최대 15글자 이하이어야 합니다'),

  check('option')
    .custom((option, { req, location, path }) => {
      if (Array.isArray(option) && option.length >= 2) return option;
      return false;
    })
    .withMessage('Option은 최소 2개 이상이어야 합니다')
    .custom((option, { req, location, path }) => {
      if (Array.isArray(option) && option.length >= 2) return option;
      return false;
    })
    .withMessage('Option은 최대 5개 이하이어야 합니다'),

  check('expirationDate')
    .custom((expirationDate, { req, location, path }) => {
      const { expirationTime } = req.body;
      const expiration = parseUserInputs(expirationDate, expirationTime);
      if (isPast(expiration)) return false;
      return expirationDate;
    })
    .withMessage('만료시간은 현재시간 이후로 설정해야합니다'),
];

module.exports = { createVoting };
