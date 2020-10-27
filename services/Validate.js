const { format, } = require('date-fns');
const {
  EMAIL_REGEX,
  PASSWORD_REGEX,
} = require('./constants');

const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

const validatePassword = (password) => {
  return PASSWORD_REGEX.test(password);
};

const validateNickname = (nickname) => {
  return nickname.length >= 3;
};

const validateTitle = (title) => {
  return title.length >= 2;
};

const validatePoll = (poll) => {
  return poll.length >= 2;
};

const validateDate = (date) => {
  return date >= format(new Date(), 'yyyy-MM-dd');
};

module.exports = {
  validateEmail,
  validatePassword,
  validateNickname,
  validateTitle,
  validatePoll,
  validateDate,
};
