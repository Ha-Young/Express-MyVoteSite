const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/loginController");

router.get("/", loginController.getLoginPage);
router.post("/", loginController.authenticateUser, loginController.directUserToRelevantPage);

module.exports = router;
