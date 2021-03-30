const AppError = require("../../utils/AppError");

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err) => {
  return new AppError("A email must be unique.", 400);
};

module.exports = (err, req, res, next) => {
  let error = { ...err };

  error.statusCode = error.statusCode || 500;
  error.status = `${error.statusCode}`.startsWith("4") ? "fail" : "error";

  if (err.name === "ValidationError") {
    error = handleValidationErrorDB(error);
  } else if (err.code === 11000) {
    error = handleDuplicateErrorDB(error);
  }

  res.locals.error = process.env.NODE_ENV === "development" ? error : {};

  if (error.isOperational) {
    res.locals.status = error.status;
    res.locals.message = error.message;

    res.status(error.statusCode).render("error", { layout: false });
  } else {
    console.log("ERROR ❗️", error);

    res.locals.status = "error";
    res.locals.message = "Internal Server Error.";
    res.status(500).render("error", { layout: false });
  }
};
