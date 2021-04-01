const express = require("express");
const router = express.Router();
const passport = require("passport");
const deleteVotingController = require("./controller/deleteVotingController");

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteVotingController.deleteVoting
);

module.exports = router;
