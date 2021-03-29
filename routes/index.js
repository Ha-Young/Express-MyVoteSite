const express = require("express");
const router = express.Router();
const verifyToken = require("./middlewares/authorization");
const { mainPage } = require("../controllers/indexController");

router.get("/", mainPage);

module.exports = router;
