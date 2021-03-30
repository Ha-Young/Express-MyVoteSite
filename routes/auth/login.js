const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/loginController");
const verifyUser = require("../middlewares/verifyUser");

router.get('/', verifyUser, loginController.getLoginPage);
router.post("/", loginController.directUserToRelevantPage);

module.exports = router;
