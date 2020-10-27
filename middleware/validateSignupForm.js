const {
  validateEmail,
  validatePassword,
  validateNickname,
} = require('../services/Validate');
const {
  EMAIL_FORM_ERROR_MESSAGE,
  PASSWORD_FORM_ERROR_MESSAGE,
  NICKNAME_FORM_ERROR_MESSAGE,
} = require('../services/constants');

const validateSignupForm = async (req, res, next) => {
  const message = [];

  const { email, password, nickname, } = req.body;

  if (!validateEmail(email)) {
    message.push(EMAIL_FORM_ERROR_MESSAGE);
  }

  if (!validatePassword(password)) {
    message.push(PASSWORD_FORM_ERROR_MESSAGE);
  }

  if (!validateNickname(nickname)) {
    message.push(NICKNAME_FORM_ERROR_MESSAGE);
  }

  if (message.length) {
    return res.render('signup', {
      message,
    });
  }

  next();
};

module.exports = validateSignupForm;
