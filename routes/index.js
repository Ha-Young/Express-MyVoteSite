const express = require("express");
const router = express.Router();

const votingController = require("../routes/controllers/votingController");

router.get("/", votingController.getAllVotings);

module.exports = router;
