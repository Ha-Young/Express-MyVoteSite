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

    res.status(err.statusCode).render("error");
  } else {
    console.log("ERROR ❗️", err);

    res.locals.status = "error";
    res.locals.message = "Internal Server Error.";
    res.status(500).render("error");
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};
