const express = require("express");
const router = express.Router();
const votingController = require("../controllers/votingController");

router
  .route("/new")
  .get(votingController.getNewVoting)
  .post(votingController.createNewVoting);

router.get("/alreadyVoted", (req, res) => {
  res.status(200).render("alreadyVoted");
});

router.get("/successVoting", (req, res) => {
  res.status(200).render("successVoting");
});

router
  .route("/:id")
  .get(votingController.getSelectedVoting)
  .patch(votingController.voteVoting)
  .delete(votingController.deleteVoting);

router.patch("/:id/cancel", votingController.cancelVoting);

module.exports = router;
