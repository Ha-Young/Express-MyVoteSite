const express = require("express");
const router = express.Router();
const { verifyRegisterInput } = require("./middlewares/verifyRegisterInput");
const usersController = require("./controllers/users.controller");

router.post("/", verifyRegisterInput, usersController.register);

module.exports = router;
