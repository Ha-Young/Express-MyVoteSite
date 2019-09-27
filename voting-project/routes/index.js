const express = require("express");
const router = express.Router();
const votingController = require("./controllers/votings.controller");

/* GET home page. */
router.get(
  "/",
  function(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/login");
    }
  },
  votingController.getAll
);

module.exports = router;
