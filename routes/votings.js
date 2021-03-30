const express = require("express");
const router = express.Router();
const { createVotePage } = require("../controllers/votingsController");
const verifyToken = require("./middlewares/authorization");
const Vote = require("../models/Vote");

router.get("/new", verifyToken, createVotePage);

router.get("/:id", verifyToken, async (req, res) => {
  const vote = await Vote.findById(req.params.id);
  const {
    isOnVote,
    title,
    creator,
    endDate,
    option
  } = vote;

  const isValidateUser = String(req.user._id) === creator;

  res.render("votings", {
    isOnVote,
    title,
    creator,
    endDate,
    option,
    isValidateUser
  });
});

router.post("/:id", (req, res) => {

});

module.exports = router;
