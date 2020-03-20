const PrettyError = require('pretty-error');
const pe = new PrettyError();

class VotingPlatform extends Error {
  constructor(message, status, displayMessage) {
    super(message);

    this.status = status;
    this.displayMessage= displayMessage;

    console.log(
      `
      STATUS: ${this.status}

      ${message}

      ERROR STACK:

      ${pe.render(this)}
      `
    );
  };
};

class ValidatorError extends VotingPlatform {
  constructor(message) {
    super(
      message,
      400,
      '유효하지않은 입력 값입니다.'
    );
  };
};

class GeneralError extends VotingPlatform {
  constructor(message) {
    super(
      message,
      500,
      '서버에 오류가 있었습니다. 잠시 후에 다시 시도해주시기 바랍니다.'
    );
  };
};

module.exports = {
  ValidatorError,
  GeneralError
}