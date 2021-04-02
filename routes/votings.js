const express = require("express");
const router = express.Router();
const passport = require("passport");
const createError = require("http-errors");
const errorMessage = require("../constants/errorMessage");

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
  function (req, res, next) {
    passport.authenticate("jwt", { session: false }, function (err, user) {
      if (err) {
        return next(createError(500, errorMessage.SERVER_ERROR));
      }

      if (!user) {
        req.flash("prevUrl", req.body.currentUrl);
        return res.status(401).send();
      }

      return next();
    })(req, res, next);
  },
  votingsController.updateVotingOption
);

module.exports = router;
