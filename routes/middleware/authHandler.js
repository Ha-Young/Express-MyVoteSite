const jwt = require("jsonwebtoken");
const passport = require("passport");
const dotenv = require("dotenv");
const createError = require("http-errors");

const errorMessage = require("../../constants/errorMessage");
dotenv.config();

exports.checkLocalAuth = function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) {
      const createdError = createError(500, errorMessage.SERVER_ERROR);
      return next(createdError);
    }

    if (!user) {
      const createdError = createError(400, errorMessage.INCORRECT_AUTH);
      return next(createdError);
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        const createdError = createError(500, errorMessage.SERVER_ERROR);
        return next(createdError);
      }

      next();
    });
  })(req, res, next);
};

exports.checkGoogleAuth = function (req, res, next) {
  passport.authenticate(
    "google",
    { session: false, scope: ["profile", "email"] },
    (err, profile) => {
      console.log("errr is this?", err);
      if (err) {
        const createdError = createError(500, errorMessage.SERVER_ERROR);
        return next(createdError);
      }
      req.user = profile;
      next();
    }
  )(req, res);
};
