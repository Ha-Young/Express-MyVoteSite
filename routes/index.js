const express = require("express");
const router = express.Router();
const { getMainPage } = require("../controllers/indexController");

router.get("/", getMainPage);

module.exports = router;
