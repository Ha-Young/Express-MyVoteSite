const AppError = require("../../utils/AppError");

const sendErrorDev = (err, res) => {
  res.locals.status = err.status;
  res.locals.message = err.message;
  res.locals.error = err;

  res.status(err.statusCode).render("error");
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.locals.status = err.status;
    res.locals.message = err.message;
    res.locals.error = {};

    res.status(err.statusCode).render("error");
  } else {
    console.log("ERROR ❗️", err);

    res.locals.status = "error";
    res.locals.message = "Internal Server Error.";
    res.locals.error = {};
    res.status(500).render("error");
  }
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;

  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (err.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }

    sendErrorProd(error, res);
  }
};
