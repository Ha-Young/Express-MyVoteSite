const PrettyError = require('pretty-error');
const pe = new PrettyError();

class VotingPlatformError extends Error {
  constructor(message, status, displayMessage) {
    super(message);
    this.status = status;
    this.displayMessage = displayMessage

    console.log(
      `< [STATUS: ${this.status}] ${pe.render(message)} >

      < Error Stack >
      ${pe.render(this)}
      `
    );
  }
}

class ValidationError extends VotingPlatformError {
  constructor(displayMessage) {
    super('validation errors.', 422, displayMessage);
  }
}

class HashGenerationError extends VotingPlatformError {
  constructor(message) {
    super(message, 500, 'Error has occured while hashing password in bcyrpt.');
  }
}

class DuplicateUserError extends VotingPlatformError {
  constructor(message) {
    super(message, 409, 'email address already exists. Try another email.');
  }
}

class InvalidUrl extends VotingPlatformError {
  constructor(message) {
    super(message, 404, 'Page not found.');
  }
}

class InvalidUserInfo extends VotingPlatformError {
  constructor(message) {
    super(message, 401, 'Invalid Id or password. Please try again.');
  }
}

class LoginError extends VotingPlatformError {
  constructor(message) {
    super(message, 500, 'Something went wrong while login. Please try again.');
  }
}


module.exports = {
  ValidationError,
  HashGenerationError,
  DuplicateUserError,
  InvalidUrl,
  InvalidUserInfo,
  LoginError
};
