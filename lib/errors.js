const PrettyError = require("pretty-error");
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

class HashGenerationError extends VotingPlatformError {
  constructor(message) {
    super(message, 500, "회원 정보를 저장하던 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
}

class DuplicateUserError extends VotingPlatformError {
  constructor(message) {
    super(message, 409, "이미 존재하는 email입니다. 다른 email로 다시 시도해주세요.");
  }
}

class InvalidUrlError extends VotingPlatformError {
  constructor(message) {
    super(message, 404, "페이지를 찾을 수 없습니다.");
  }
}

class GeneralError extends VotingPlatformError {
  constructor(message) {
    super(message, 500, "서버 내부에 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
}

class LoginError extends VotingPlatformError {
  constructor(message) {
    super(message, 500, "로그인 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
}

class NonExistingVoteError extends VotingPlatformError {
  constructor() {
    super(
      "해당 문제는 존재하지 않습니다.",
      400,
      "해당 문제는 존재하지 않습니다.",
    );
  }
}

module.exports = {
  HashGenerationError,
  DuplicateUserError,
  InvalidUrlError,
  LoginError,
  GeneralError,
  NonExistingVoteError
};
