const express = require("express");
const router = express.Router();
const authController = require("../../controllers/logoutController");

router.get("/", authController.getLogOut);

module.exports = router;
