const express = require("express");
const votingController = require("./controllers/voting.cotroller");
const router = express.Router();

/* GET home page. */
router.get("/", votingController.getAllVotes);

module.exports = router;
