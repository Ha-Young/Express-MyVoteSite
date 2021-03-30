const express = require("express");
const router = express.Router();
const Voting = require("../models/Voting");

router.get("/:votingId", async (req, res, next) => {
  const { votingId } = req.params;
  console.log(votingId);
  const voting = await Voting.findOne({ _id: votingId });

  console.log(voting);

  res.status(200).render("votingDetail", {
    voting,
  });
});

module.exports = router;
