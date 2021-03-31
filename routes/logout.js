const express = require("express");
const router = express.Router();
const { logout } = require("../controllers/logoutController");

router.get("/", logout);

module.exports = router;
