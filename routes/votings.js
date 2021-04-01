const router = require("express").Router();

const {
  getNewVoteForm,
  createVote,
  getSuccess,
  getError,
  getVote,
  patchVote,
  deleteVote,
} = require("./controllers/votings.controller");

router.get("/new", getNewVoteForm);
router.post("/new", createVote);
router.get("/success", getSuccess);
router.get("/error", getError);
router.get("/:id", getVote);
router.patch("/:id", patchVote);
router.delete("/:id", deleteVote);

module.exports = router;
