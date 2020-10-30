const User = require('../../models/User');
const { checkPassedDate } = require('../../utils');
const {
  entryErrorMessage : {
    PASSWORD_NOT_MATCHED,
    INVALID_PASSWORD,
    EMAIL_NOT_AVAILABLE,
    INVALID_EMAIL,
  },
  registerErrorMessage: {
    OPTIONS_NOT_ENOUGH,
    PREVIOUS_TIME_NOT_ALLOWED,
  },
} = require('../../constants');

exports.validateSignupInputs = async (req, res, next) => {
  const {
    email,
    password,
    ['confirm-password']: confirmPassword
  } = req.body;
  const signupUrl = req.originalUrl;

  try {
    if (password !== confirmPassword) {
      req.flash('message', PASSWORD_NOT_MATCHED);
      return res.redirect(signupUrl);
    }

    if (password.length < 9) {
      req.flash('message', INVALID_PASSWORD);
      return res.redirect(signupUrl);
    }

    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegExp.test(email)) {
      req.flash('message', INVALID_EMAIL);
      return res.redirect(signupUrl);
    }

    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
      req.flash('message', EMAIL_NOT_AVAILABLE)
      return res.redirect(signupUrl);
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.validateVotingInputs = (req, res, next) => {
  const { ['option-title']: optionTitle, ['due-date']: dueDate } = req.body;

  if (!optionTitle || typeof optionTitle === 'string' || optionTitle.length < 2) {
    req.flash('message', OPTIONS_NOT_ENOUGH);
    return res.redirect('/votings/new');
  }

  if (checkPassedDate(dueDate)) {
    req.flash('message', PREVIOUS_TIME_NOT_ALLOWED);
    return res.redirect('/votings/new');
  }

  next();
};
