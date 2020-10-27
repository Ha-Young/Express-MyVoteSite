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

module.exports = {
  validateEmail,
  validatePassword,
  validateNickname,
};
