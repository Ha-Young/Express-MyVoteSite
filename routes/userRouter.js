const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .route("/signup")
  .get(authController.getSignUp)
  .post(authController.postSignUp);

router
  .route("/login")
  .get(authController.getLogIn)
  .post(authController.postLogIn);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword", authController.resetPassword);
router.delete("/deleteUser", authController.deleteUser);

router.post("logout", authController.getLogOut);

module.exports = router;
