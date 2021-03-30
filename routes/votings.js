const express = require("express");
const router = express.Router();
const { createVotePage } = require("../controllers/votingsController");
const verifyToken = require("./middlewares/authorization");
const Vote = require("../models/Vote");
const User = require("../models/User");

router.get("/new", verifyToken, createVotePage);

router.get("/:id", verifyToken, async (req, res) => {
  const votingId = req.params.id;
  const vote = await Vote.findById(votingId);
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
    isValidateUser,
    votingId
  });
});

router.post("/:id", verifyToken, async (req, res) => {
  const userId = req.user._id;
  const voteId = req.params.id;
  const selectedOption = req.body.option;

  const vote = await Vote.findById(voteId);
  const { votedUsersId, option } = vote;
  const isUserVoted = votedUsersId.includes(userId);

  if (isUserVoted) {
    res.redirect(301, "/");

    return;
  }

  const targetOption = option.find(optionObj => optionObj.optionTitle === selectedOption);

  targetOption.votedUsers.push(userId);
  votedUsersId.push(userId);

  vote.save();

  res.redirect(301, "/")
});

module.exports = router;
