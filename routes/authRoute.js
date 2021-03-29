const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");

router
  .route("/signup")
  .get(authController.getSignUp)
  .post(authController.postSignUp);

router
  .route("/login")
  .get(authController.getLogIn)
  .post(authController.postLogIn);

router.get("logout", authController.getLogOut);

module.exports = router;
