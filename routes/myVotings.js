const express = require("express");
const router = express.Router();
const { getMyVotes } = require("../controllers/myVotingsController");

router.get("/", getMyVotes);

module.exports = router;
