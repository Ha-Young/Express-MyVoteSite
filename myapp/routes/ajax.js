const express = require("express");
const createError = require("http-errors");
const User = require("../models/User");
const { findOneAndUpdate } = require("../models/Voting");
const Voting = require("../models/Voting");

const router = express.Router();

router.post("/changeVotingCount", async (req, res, next) => {
  // Voting.
  const { _id } = req.body;
  await findOneAndUpdate({ _id });
  res.send("ajax");
});

module.exports = router;
