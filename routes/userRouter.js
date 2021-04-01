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

router.delete("/deleteUser", authController.deleteUser);
router.post("/logout", authController.logOut);

module.exports = router;
