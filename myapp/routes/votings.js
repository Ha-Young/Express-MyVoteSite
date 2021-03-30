const express = require("express");
const router = express.Router();
const Voting = require("../models/Voting");

router.get("/:votingId", async (req, res, next) => {
  const { votingId } = req.params;

  const voting = await Voting.findOne({ votingId });

  console.log(voting);

  res.send("voting");
});

module.exports = router;
