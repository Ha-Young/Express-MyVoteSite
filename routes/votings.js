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

router.patch("/:id", verifyToken, async (req, res) => {
  const userId = req.user._id;
  const voteId = req.params.id;
  const selectedOption = req.body.option;

  const vote = await Vote.findById(voteId);
  const { votedUsersId, option } = vote;
  const isUserVoted = votedUsersId.includes(userId);
  console.log(res.redirectd)
  if (isUserVoted) {
    res.end();

    return;
  }

  const targetOption = option.find(optionObj => optionObj.optionTitle === selectedOption);

  targetOption.votedUsers.push(userId);
  votedUsersId.push(userId);

  vote.save();

  res.end();
});

router.delete("/:id", async (req, res) => {
  const postId = req.params.id;

  await Vote.findByIdAndDelete(postId);

  res.end();
});

module.exports = router;
