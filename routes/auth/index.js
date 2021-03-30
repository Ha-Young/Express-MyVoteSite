const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup, authController.getLogin);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/logout", authController.getLogout);

module.exports = router;
