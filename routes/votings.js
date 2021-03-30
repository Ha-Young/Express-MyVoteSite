const router = require("express").Router();

const { getVote } = require("./controllers/votings.controller");

router.get("/:id", getVote);

module.exports = router;
