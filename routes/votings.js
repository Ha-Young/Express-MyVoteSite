const router = require("express").Router();

const {
  getVote,
  patchVote,
  deleteVote,
  getNewVoteForm,
  createVote,
  getSuccess,
  getError,
} = require("./controllers/votings.controller");

router.get("/:id", getVote);
router.patch("/:id", patchVote);
router.delete("/:id", deleteVote);
router.get("/new", getNewVoteForm);
router.post("/new", createVote);
router.get("/success", getSuccess);
router.get("/error", getError);

module.exports = router;
