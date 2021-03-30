const router = require("express").Router();

const authController = require("./controllers/authController");

router
  .route("/signup")
  .get(authController.renderSignupPage)
  .post(authController.signup);

router
  .route("/login")
  .get(authController.renderLoginPage)
  .post(authController.login);

router
  .route("/logout")
  .get(authController.logout);

module.exports = router;
