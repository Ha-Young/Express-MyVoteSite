const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .route("/signup")
  .get(authController.getSignUp)
  .post(authController.createUser);

router
  .route("/login")
  .get(authController.getLogIn)
  .post(authController.postLogIn);

router.post("/forgotPassword", authController.forgotPassword);

router
  .route("/resetPassword")
  .get(authController.getResetPassword)
  .post(authController.resetPassword);

router.delete("/deleteUser", authController.deleteUser);
router.post("/logout", authController.getLogOut);

module.exports = router;
