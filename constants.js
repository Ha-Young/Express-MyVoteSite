exports.SALT_ROUNDS = 10;

exports.entryErrorMessage = {
  PASSWORD_NOT_MATCHED: 'password does not matched.',
  EMAIL_NOT_AVAILABLE: 'email is not available.',
  INVALID_PASSWORD: 'password should be at least 8 characters.',
  INVALID_EMAIL: 'should be a vaild email address.',
  USER_NOT_EXIST: 'this user does not exist.',
};

exports.registerErrorMessage = {
  OPTIONS_NOT_ENOUGH: 'options should be set at least 2 options.',
  PREVIOUS_TIME_NOT_ALLOWED: 'previous time cannot be set.',
};

exports.dbErrorMessage = {
  DB_ERROR_READING_ALL_VOTINGS: 'Error while reading all votings',
  DB_ERROR_CREATING_USER: 'Error while creating user',
  DB_ERROR_CREATING_VOTING: 'Error while creating voting',
  DB_ERROR_READING_VOTING: 'Error while reading voting',
  DB_ERROR_READING_VOTERS: 'Error while reading voters',
  DB_ERROR_UPDATING_COUNT: 'Error while updating count',
  DB_ERROR_UPDATING_VOTERS: 'Error while updating voters',
  DB_ERROR_DELETING_USER_VOTINGS: 'Error while deleting user votings',
  DB_ERROR_DELETING_VOTING: 'Error while deleting voting',
};

exports.otherMessage = {
  ALREADY_VOTED: 'you have already voted.',
  RESULT_OK: 'ok',
};
