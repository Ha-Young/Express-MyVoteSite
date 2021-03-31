const express = require("express");
const router = express.Router();
const passport = require("passport");
const myVotingsController = require("./controller/myVotingsController");

router.get(
  "/:userid",
  passport.authenticate("jwt", { session: false }),
  myVotingsController.renderMyVotingsPage
);

module.exports = router;
