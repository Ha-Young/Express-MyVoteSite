const express = require("express");
const router = express.Router();
const passport = require("passport");
const validationHandler = require("./middleware/validationHandler");
const newVoteController = require("./controller/newVoteController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  newVoteController.renderNewVotePage
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validationHandler.createVote,
  newVoteController.createVote
);

module.exports = router;
