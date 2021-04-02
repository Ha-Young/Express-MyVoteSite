exports.signupErrorMessage = Object.freeze({
  INVALID_EMAIL: 'E-mail is invalid',
  INVALID_NAME: 'Name is invalid',
  INVALID_PASSWORD: 'Password is invalid',
  INVALID_PASSWORDCONFIRM: 'Password confirm is not same as password',
});

exports.loginErrorMessage = Object.freeze({
  INVALID_EMAIL: 'E-mail is invalid',
  INVALID_PASSWORD: 'Password is invalid',
});

exports.createVotingErrorMessage = Object.freeze({
  INVALID_TITLE: 'Title is invalid',
  INVALID_OPTION: 'Option is invalid',
  INVALID_EXPIRATION_DATE: 'Expiration date must be later than now',
});
