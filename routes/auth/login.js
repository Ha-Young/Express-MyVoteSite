const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/loginController");
const verifyUser = require("../middlewares/verifyUser");
const verifyAuth = require("../middlewares/verifyAuth")

router.get('/', loginController.getLoginPage);
router.post("/", loginController.directUserToRelevantPage);

module.exports = router;
