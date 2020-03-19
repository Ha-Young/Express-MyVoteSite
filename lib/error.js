const PrettyError = require('pretty-error');
const pe = new PrettyError();

class VotingPlatformError extends Error {
  constructor(message, status, displayMessage) {
    super(message);
    this.status = status;
    this.displayMessage = displayMessage;
    console.log(message, status, displayMessage);
    console.log(
      `< [STATUS: ${this.status}] Error Message>

      ${message}

      < Error Stack >

      ${pe.render(this)}
      `
    );
  }
}

class SignupEmailError extends VotingPlatformError {
  constructor(message) {
    super(message, 400, '이미 존재하는 이메일입니다.');
  }
}

class SignupNicknameError extends VotingPlatformError {
  constructor(message) {
    super(message, 400, '이미 존재하는 닉네임입니다.');
  }
}

class SignupPasswordError extends VotingPlatformError {
  constructor(message) {
    super(message, 400, '비밀번호가 일치하지 않습니다.');
  }
}

class LoginEmailError extends VotingPlatformError {
  constructor(message) {
    super(message, 400, '존재하지 않는 유저입니다.');
  }
}

class LoginPasswordError extends VotingPlatformError {
  constructor(message) {
    super(message, 400, '비밀번호가 일치하지 않습니다.');
  }
}

class VotingTimeError extends VotingPlatformError {
  constructor(message) {
    super(message, 400, '만료일은 현재보다 과거일 수 없습니다.');
  }
}

class VotingValidationError extends VotingPlatformError {
  constructor(message) {
    super(message, 400, '공백이 있습니다.');
  }
}

class VotingDuplicateError extends VotingPlatformError {
  constructor(message) {
    super(message, 400, '이미 완료한 투표입니다');
  }
}

class PageNotFoundError extends VotingPlatformError {
  constructor(message) {
    super(message, 404, '페이지가 존재하지 않습니다.');
  }
}

class GeneralError extends VotingPlatformError {
  constructor(message) {
    super(
      message,
      500,
      '서버에 오류가 있었습니다. 잠시 후에 다시 시도해주시기 바랍니다.'
    );
  }
}

module.exports = {
  PageNotFoundError,
  SignupEmailError,
  SignupNicknameError,
  SignupPasswordError,
  LoginEmailError,
  LoginPasswordError,
  VotingTimeError,
  VotingValidationError,
  VotingDuplicateError,
  GeneralError
};
