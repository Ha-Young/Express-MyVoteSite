const express = require("express");

const updateVoteExpiration = require("../middlewares/updateVoteExpiration");
const homeControllers = require("../controllers/home.controllers");

const router = express.Router();

router.get("/", updateVoteExpiration, homeControllers.renderVotes);

module.exports = router;
