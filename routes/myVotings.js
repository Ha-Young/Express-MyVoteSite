const express = require("express");
const router = express.Router();
const passport = require("passport");
const myVotingsController = require("./controller/myVotingsController");

router.get(
  "/",
  function (req, res, next) {
    passport.authenticate("jwt", { session: false }, function (err, user) {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.redirect("/login");
      }

      req.user = user;
      return next();
    })(req, res, next);
  },
  myVotingsController.renderMyVotingsPage
);

module.exports = router;
