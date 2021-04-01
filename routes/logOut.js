const express = require("express");
const logOutController = require("./controller/logOutController");
const router = express.Router();

router.get("/", logOutController.handleLogOut);

module.exports = router;
