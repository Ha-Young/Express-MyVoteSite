const express = require("express");
const router = express.Router();

const authenticateUser = require("../routes/middlewares/authenticateUser");
const indexController = require("../routes/controllers/index.controller");

router.get("/", authenticateUser, indexController.getAll);
router.get("/my-votings", authenticateUser, indexController.renderMyVotings);

module.exports = router;
