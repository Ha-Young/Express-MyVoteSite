const express = require('express');
const router = express.Router();

const votingController = require("./controller/votes.controller");

router.get('/', votingController.getAllVotings);

module.exports = router;
