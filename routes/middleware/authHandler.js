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
      // console.log("auth user", user);
      // delete user.password;
      // console.log("delete pass user", user);

      next();

      //로컬 인증 후 jwt 발급 미들웨어로 분리
      // jwt.sign(
      //   user.toJSON(),
      //   process.env.JWT_SECRET_KEY,
      //   { expiresIn: "1d" },
      //   (err, token) => {
      //     if (err) {
      //       const createdError = createError(500, errorMessage.SERVER_ERROR);
      //       return next(createdError);
      //     }
      //     return res
      //       .cookie("jwt", token, {
      //         httpOnly: true,
      //       })
      //       .status(200)
      //       .redirect("/");
      //   }
      // );
    });
  })(req, res);
};

exports.checkGoogleAuth = function (req, res, next) {
  console.log("inside checkGoogleAuth");
  passport.authenticate(
    "google",
    { session: false, scope: ["profile", "email"] },
    (err, user) => {
      console.log("google user", user);
      if (err) {
        const createdError = createError(500, errorMessage.SERVER_ERROR);
        return next(createdError);
      }

      if (!user) {
        const createdError = createError(400, errorMessage.INCORRECT_AUTH);
        return next(createdError);
      }

      // req.login(user, { session: false }, (err) => {
      //   if (err) {
      //     const createdError = createError(500, errorMessage.SERVER_ERROR);
      //     return next(createdError);
      //   }

      //   next();
      // });

      next();
    }
  );
};
