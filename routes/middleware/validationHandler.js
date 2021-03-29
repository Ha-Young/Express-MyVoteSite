const createError = require("http-errors");

const {
  validateRegisterForm,
  validateLoginForm,
} = require("../../util/validation");

exports.register = function (req, res, next) {
  const { error } = validateRegisterForm(req.body);

  if (error) {
    const errors = error;
    const errorMessages = errors.details.map((error) => {
      req.flash("signError", `${error.message}`);
      return error.message;
    });

    console.log("error messages", errorMessages);
    return res.status(200).redirect("/signup");
  }

  next();
};

exports.login = function (req, res, next) {
  const { error } = validateLoginForm(req.body);

  if (error) {
    const errors = error;
    const errorMessages = errors.details.map((error) => {
      req.flash("signError", `${error.message}`);
      return error.message;
    });

    console.log("error messages", errorMessages);
    return res.status(200).redirect("/login");
  }

  next();
};
