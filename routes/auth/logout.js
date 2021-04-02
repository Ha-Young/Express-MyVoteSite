const express = require("express");
const router = express.Router();
const logoutController = require("../../controllers/logoutController");
const verifyAuth = require("../middlewares/verifyAuth")

router.get('/', logoutController.getLogOut);

module.exports = router;
