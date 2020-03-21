const PrettyError = require("pretty-error");
const pe = new PrettyError();

class voteError extends Error {
  constructor (message, status, displayMessage) {
    super(message);

    this.status = status;
    this.displayMessage = displayMessage;

    console.log(
      `< [STATUS: ${this.status}] ${pe.render(message)}>
      <Error Stack>
      ${pe.render(this)}
      `
    );
  }
}

class ValidationError extends voteError {
  constructor (message, field) {
    super(message, 400, `${field}는 유효하지않은 값입니다.`);
  }
}

class InvalidObjectIdError extends voteError {
  constructor (message, problemId) {
    super(message, 400, `${problemId}가 존재하지 않습니다.`);
  }
}

class NotFoundError extends voteError {
  constructor (message) {
    super(message, 404, '404 : NOT FOUND. 페이지를 찾을수없습니다.');
  }
}

class GeneralError extends voteError {
  constructor (message) {
    super(message, 500, '서버에 오류가 있습니다. 잠시후 다시 시도해주세요.');
  }
}

module.exports = {
  ValidationError,
  InvalidObjectIdError,
  NotFoundError,
  GeneralError
};
