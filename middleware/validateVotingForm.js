const {
  validateTitle,
  validatePoll,
  validateDate,
} = require('../services/validate');
const {
  TITLE_FORM_ERROR_MESSAGE,
  POLL_FORM_ERROR_MESSAGE,
  DATE_FORM_ERROR_MESSAGE,
} = require('../services/constants');

const validateSignupForm = async (req, res, next) => {
  const message = [];

  const { title, polls, expiration_date, } = res.locals.serializedForm;

  if (!validateTitle(title)) {
    message.push(TITLE_FORM_ERROR_MESSAGE);
  }

  polls.forEach((poll) => {
    if (!validatePoll(poll.title)) {
      message.push(POLL_FORM_ERROR_MESSAGE);
    }
  });

  if (!validateDate(expiration_date)) {
    message.push(DATE_FORM_ERROR_MESSAGE);
  }

  if (message.length) {
    return res.render('voting/new', {
      message,
    });
  }

  next();
};

module.exports = validateSignupForm;
