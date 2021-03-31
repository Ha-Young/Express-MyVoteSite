const express = require("express");
const router = express.Router();
const passport = require("passport");

const votingsController = require("./controller/votingsController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  votingsController.renderVotingsPage
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  votingsController.renderDetailPage
);

module.exports = router;
