const express = require("express");
const router = express.Router();
const usersController = require("./controllers/users.controller");
const { verifyLoginInput } = require("./middlewares/verifyLoginInput");

router.post("/", verifyLoginInput, usersController.generateToken);

module.exports = router;
