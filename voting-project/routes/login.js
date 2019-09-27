const express = require("express");
const router = express.Router();

module.exports = function(passport) {
  router.get("/", function(req, res, next) {
    var fmsg = req.flash();
    var feedback = "";
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    res.render("login", { error: feedback });
  });

  router.post(
    "/",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: true
    })
  );

  return router;
};
