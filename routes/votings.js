const router = require("express").Router();

const { getVote, patchVote, deleteVote } = require("./controllers/votings.controller");

router.get("/:id", getVote);
router.patch("/:id", patchVote);
router.delete("/:id", deleteVote);

module.exports = router;
