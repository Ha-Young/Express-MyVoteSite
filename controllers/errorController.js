const CreateError = require("./../utils/createError");

const handleCastErrorDB = (err) => {
  const message = `유효성 실패 ${err.path}: ${err.value}.`;
  return new CreateError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `중복된 값입니다.: ${value}`;
  return new CreateError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.value(err.errors).map((el) => el.message);

  const message = `잘못된 입력입니다. ${errors.join(". ")}`;
  return new CreateError(message, 400);
};

const handleJWTError = () => {
  const message = "유효하지 않은 토큰 정보입니다. 나중에 다시 시도해주세요.";

  return new CreateError(message, 400);
};

const handleTokenExpiredError = () => {
  const message = "토큰이 만료되었습니다. 로그인이 필요합니다.";

  return new CreateError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  console.log("sendErroPord");
  if (err.isOperational) {
    res.status(err.statusCode).render("error", {
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(`ERROR ❌`, err);

    res.status(500).render("error", {
      status: "error",
      message: "죄송합니다. 에러가 발생하였습니다.",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError")
      error = handleTokenExpiredError(error);

    sendErrorProd(error, res);
  }
};
