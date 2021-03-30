const express = require("express");
const router = express.Router();

const authenticateUser = require("../routes/middlewares/authenticateUser");

/* GET home page. */
const indexController = require("../routes/controllers/index.controller");

router.get("/", authenticateUser, indexController.getAll);

module.exports = router;
