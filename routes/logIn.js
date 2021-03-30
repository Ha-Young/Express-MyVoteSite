const express = require("express");
const passport = require("passport");
const router = express.Router();
const logIncotroller = require("./controller/logInController");
const validationHandler = require("./middleware/validationHandler");
const authHandler = require("./middleware/authHandler");
const jwtHandler = require("./middleware/jwtHandler");
const socialSignUpHandler = require("./middleware/socialSignUpHandler");

router.get("/", logIncotroller.renderLogInPage);
router.get("/auth/google", authHandler.checkGoogleAuth);
router.get(
  "/auth/google/callback",
  authHandler.checkGoogleAuth,
  socialSignUpHandler.createUser,
  jwtHandler.signToken
);

router.post(
  "/auth",
  validationHandler.login,
  authHandler.checkLocalAuth,
  jwtHandler.signToken
);

module.exports = router;
