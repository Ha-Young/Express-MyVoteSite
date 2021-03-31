const express = require("express");
const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../models/User");
const { findOneAndUpdate } = require("../models/Voting");
const Voting = require("../models/Voting");

const router = express.Router();

router.post("/changeVotingCount", async (req, res, next) => {
  try {
    const { votingId, optionId } = req.body;
    const voting = await Voting.findOne({ _id: votingId });
    const option = voting.votingItems.id(optionId);
    option.count += 1;

    await voting.save();

    res.status(200).json({ count: option.count });
  } catch (err) {
    console.log(`post /changeVotingCount ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

module.exports = router;
