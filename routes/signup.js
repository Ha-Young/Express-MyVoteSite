const express = require("express");
const router = express.Router();
const { identifyUserInput } = require("./middlewares/identifyUserInput");
const usersController = require("./controllers/users.controller");

router.post("/", identifyUserInput, usersController.register);

module.exports = router;
