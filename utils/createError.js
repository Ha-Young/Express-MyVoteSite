class CreateError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    // 4로 시작하는 에러는 fail로 구분
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // 우리가 만든 에러는 다 아래의 isOperational true를 갖고 있을 것임
    // 공격이나 프로그래밍 결함으로 인한 에러를 구분할 수 있음
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CreateError;
