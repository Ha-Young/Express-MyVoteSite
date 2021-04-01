const express = require("express");
const router = express.Router();
const passport = require("passport");

const votingsController = require("./controller/votingsController");

router.get("/", votingsController.renderVotingsPage);

router.get("/id/:id", votingsController.renderDetailPage);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  votingsController.renderDetailPage
);

router.post(
  "/voted/:id",
  passport.authenticate("jwt", { session: false }),
  votingsController.updateVotingOption
);

module.exports = router;
