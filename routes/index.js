var express = require('express');
var router = express.Router();

const votingController = require("./controller/votes.controller");
const { requireAuth } = require("./middleware/requireAuth");

/* GET home page. */
router.get('/', votingController.getAllVotings);

module.exports = router;
