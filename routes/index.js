const express = require("express");
const router = express.Router();
const passport = require("passport");

const indexController = require("./controller/indexController");

router.get(
  "/",
  function (req, res, next) {
    passport.authenticate(
      "jwt",
      { session: false },
      function (err, user, info) {
        if (err) {
          return next(err);
        }

        if (!user) {
          return next();
        }

        return res.redirect("/votings");
      }
    )(req, res, next);
  },
  indexController.renderIndexPage
);

module.exports = router;
