const User = require('../model/User');
const {
  validateEmail,
  validatePassword,
} = require('../services/Validate');
const {
  EMAIL_FORM_ERROR_MESSAGE,
  PASSWORD_FORM_ERROR_MESSAGE,
  EMAIL_NOT_EXIST_ERROR_MESSAGE,
}= require('../services/constants');

const validateLoginForm = async (req, res, next) => {
  const { email, password, } = req.body;
  const isExist = await User.exists({ email, });
  const message = [];

  if (!isExist) {
    message.push(EMAIL_NOT_EXIST_ERROR_MESSAGE);
  }

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
