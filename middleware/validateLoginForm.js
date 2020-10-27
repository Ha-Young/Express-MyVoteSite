const {
  validateEmail,
  validatePassword,
} = require('../services/Validate');
const {
  EMAIL_FORM_ERROR_MESSAGE,
  PASSWORD_FORM_ERROR_MESSAGE,
}= require('../services/constants');

const validateLoginForm = async (req, res, next) => {
  const message = [];

  const { email, password, } = req.body;

  if (!validateEmail(email)) {
    message.push(EMAIL_FORM_ERROR_MESSAGE);
  }

  if (!validatePassword(password)) {
    message.push(PASSWORD_FORM_ERROR_MESSAGE);
  }

  if (message.length) {
    return res.render('login', {
      message,
    });
  }

  next();
};

module.exports = validateLoginForm;
