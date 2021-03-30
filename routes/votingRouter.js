const express = require("express");
const router = express.Router();
const votingController = require("../controllers/votingController");

router
  .route("/new")
  .get(votingController.getNewVoting)
  .post(votingController.createNewVoting);

router.get("/success", votingController.getSuccess);
router.get("/error", votingController.getFail);

router
  .route("/:id")
  .get(votingController.getSelectedVoting)
  .post(votingController.voteVoting)
  .delete(votingController.deleteVoting);

module.exports = router;
