const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const authenticateUser = require("../middlewares/authenticateUser");

router.get("/", authController.getLoginPage);
router.post("/", authenticateUser, authController.directUserToRelevantPage);

module.exports = router;
