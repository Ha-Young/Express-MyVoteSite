const router = require("express").Router();

const votingsController = require("./controllers/votingsController");
const authenticateUser = require("../utils/authenticateUser");

router
  .route("/new")
  .get(authenticateUser, votingsController.renderVotingsPage)
  .post(votingsController.createVote);

router
  .route("/:id")
  .get(votingsController.renderVoteDetailPage)
  .post(authenticateUser, votingsController.voting)
  .delete(votingsController.deleteVote);

module.exports = router;
