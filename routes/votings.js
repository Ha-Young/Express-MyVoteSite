const router = require("express").Router();

const { NEW, PARAM_ID } = require("../constants");
const votingsController = require("./controllers/votingsController");
const authenticateUser = require("./middlewares/authenticateUser");

router
  .route(NEW)
  .get(authenticateUser, votingsController.renderVotingsPage)
  .post(votingsController.createVote);

router
  .route(PARAM_ID)
  .get(authenticateUser, votingsController.renderVoteDetailPage)
  .post(authenticateUser, votingsController.voting)
  .delete(votingsController.deleteVote);

module.exports = router;
