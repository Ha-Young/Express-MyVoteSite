const router = require("express").Router();

const { SIGNUP, LOGIN, LOGOUT } = require("../constants");
const authController = require("./controllers/authController");

router
  .route(SIGNUP)
  .get(authController.renderSignupPage)
  .post(authController.signup);

router
  .route(LOGIN)
  .get(authController.renderLoginPage)
  .post(authController.login);

router
  .route(LOGOUT)
  .get(authController.logout);

module.exports = router;
