const express = require("express");
const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../models/User");
const { findOneAndUpdate } = require("../models/Voting");
const Voting = require("../models/Voting");

const router = express.Router();

router.post("/changeVotingCount", async (req, res, next) => {
  // Voting.
  const { votingId, optionId } = req.body;
  console.log(votingId);
  // // const votingOption = await Voting.findOne({ _id: dbId });
  // votingOption = Voting.console.log(votingOption);
  const voting = await Voting.findOne({ _id: votingId });
  const option = voting.votingItems.id(optionId);
  console.log(voting);
  console.log(option);
  option.count += 1;

  await voting.save();

  res.status(200).json({ count: option.count });
});

module.exports = router;
