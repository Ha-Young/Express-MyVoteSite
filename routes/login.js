const express = require("express");
const router = express.Router();
const { verifyLoginInput } = require("./middlewares/verifyLoginInput");
const usersController = require("./controllers/users.controller");

router.get("/", (req, res) => res.render("login"));
router.post("/", verifyLoginInput, usersController.generateToken);

module.exports = router;
