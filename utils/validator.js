const { format, } = require('date-fns');

const { UserService, VotingService, } = require('../services/database');
const {
  EMAIL_REGEX,
  PASSWORD_REGEX,
} = require('../constants/regex');
const {
  EMAIL_DUPLICATE_ERROR_MESSAGE,
  EMAIL_FORM_ERROR_MESSAGE,
  PASSWORD_FORM_ERROR_MESSAGE,
  NICKNAME_DUPLICATE_ERROR_MESSAGE,
  EMAIL_NOT_EXIST_ERROR_MESSAGE,
  DIFF_PASSWORD,
  TITLE_DUPLICATE_ERROR_MESSAGE,
  TITLE_FORM_ERROR_MESSAGE,
  POLL_FORM_ERROR_MESSAGE,
  DATE_FORM_ERROR_MESSAGE,
} = require('../constants/errorMessage');
const DEFAULT_CALLBACK = require('../utils/defaultCallback');

class ValidError extends Error {
  push(message) {
    if (!this.message) this.message = [];
    this.message.push(message);
  }

  get hasMessage() {
    return !!this.message;
  }
}

const signUpForm = async ({ email, password, nickname, }, callback) => {
  if (!callback) callback = DEFAULT_CALLBACK;

  const validError = new ValidError();
  const userService = new UserService();

  if (!EMAIL_REGEX.test(email)) {
    validError.push(EMAIL_FORM_ERROR_MESSAGE);
  }

  if (!PASSWORD_REGEX.test(password)) {
    validError.push(PASSWORD_FORM_ERROR_MESSAGE);
  }

  try {
    const isUsedEmail = await userService.exists({ email, });
    if (isUsedEmail) {
      validError.push(EMAIL_DUPLICATE_ERROR_MESSAGE);
    }

    const isUsedNickname = await userService.exists({ nickname, });
    if (isUsedNickname) {
      validError.push(NICKNAME_DUPLICATE_ERROR_MESSAGE);
    }
  } catch (err) {
    console.error('🔥 validator: sign up form', err);
    throw Error(err);
  }

  if (validError.hasMessage) {
    callback(validError);
  } else {
    callback();
  }
};

const loginForm = async ({ email, password, }, callback) => {
  if (!callback) callback = DEFAULT_CALLBACK;

  const validError = new ValidError();
  const userService = new UserService();

  if (!EMAIL_REGEX.test(email)) {
    validError.push(EMAIL_FORM_ERROR_MESSAGE);
  }

  try {
    const isUsedEmail = await userService.exists({ email, });
    if (!isUsedEmail) {
      validError.push(EMAIL_NOT_EXIST_ERROR_MESSAGE);
    }

    const isValidPassword = await userService.verifyPassword({ email, password, });
    if (!isValidPassword) {
      validError.push(DIFF_PASSWORD);
    }
  } catch (err) {
    console.error('🔥 validator: sign up form', err);
    throw Error(err);
  }

  if (validError.hasMessage) {
    callback(validError);
  } else {
    callback();
  }
};

const votingForm = async (form, callback) => {
  if (!callback) callback = DEFAULT_CALLBACK;

  const validError = new ValidError();
  const votingService = new VotingService();
  const { voting_title, polls, expiration_date, } = form;
  const CURRENT_DATE = format(new Date(), 'yyyy-MM-dd');
  const DEFAULT_LENGTH = 3;

  const isExistTitle = await votingService.exists({ title: voting_title, });
  if (isExistTitle) {
    validError.push(TITLE_DUPLICATE_ERROR_MESSAGE);
  }

  if (voting_title.length < DEFAULT_LENGTH) {
    validError.push(TITLE_FORM_ERROR_MESSAGE);
  }

  polls.forEach((poll) => {
    if (poll.poll_title.length < DEFAULT_LENGTH) {
      validError.push(POLL_FORM_ERROR_MESSAGE);
    }
  });

  if (expiration_date > CURRENT_DATE) {
    validError.push(DATE_FORM_ERROR_MESSAGE);
  }

  if (validError.hasMessage) {
    callback(validError);
  } else {
    callback();
  }
};

module.exports = {
  signUpForm,
  loginForm,
  votingForm,
};
