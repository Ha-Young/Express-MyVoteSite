const express = require("express");
const router = express.Router();

const requireAuth = require("./middleware/requireAuth");
const voteController = require("./controller/votes.controller");

router.get("/", requireAuth, voteController.showMyVotings);

module.exports = router;
