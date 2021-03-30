const express = require("express");
const router = express.Router();
const logoutController = require("../../controllers/logoutController");
const verifyAuth = require("../middlewares/verifyAuth")

router.get('/', verifyAuth, logoutController.getLogOut);

module.exports = router;
