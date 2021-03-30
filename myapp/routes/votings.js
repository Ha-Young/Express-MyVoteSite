const express = require("express");
const router = express.Router();
const Voting = require("../models/Voting");

router.get("/:votingId", async (req, res, next) => {
  const { votingId } = req.params;
  const voting = await Voting.findOne({ _id: votingId });

  res.status(200).render("votingDetail", {
    voting,
  });
});

module.exports = router;
