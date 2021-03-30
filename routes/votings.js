const router = require("express").Router();

const votingsController = require("./controllers/votingsController");

router
  .route("/new")
  .get(votingsController.renderVotingsPage)
  .post(votingsController.createVote);

router
  .route("/:id")
  .get(votingsController.renderVoteDetailPage)
  .delete(votingsController.deleteVote);

module.exports = router;
