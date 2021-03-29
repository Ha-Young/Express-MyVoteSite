const express = require("express");
const passport = require("passport");
const router = express.Router();
const logIncotroller = require("./controller/logInController");
const validationHandler = require("./middleware/validationHandler");
const authHandler = require("./middleware/authHandler");
const jwtHandler = require("./middleware/jwtHandler");

router.get("/", logIncotroller.renderLogInPage);
router.get("/auth/google", authHandler.checkGoogleAuth, jwtHandler.signToken);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.post(
  "/auth",
  validationHandler.login,
  authHandler.checkLocalAuth,
  jwtHandler.signToken
);

module.exports = router;
