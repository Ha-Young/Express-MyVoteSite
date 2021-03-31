const express = require("express");
const router = express.Router();
const Voting = require("../models/Voting");
const getLocalTime = require("../utils/getLocalTime");
const getProgress = require("../utils/getProgress");

router.get("/new", (req, res, next) => {
  // res.send("s");
  res.render("votingNew");
});

router.post("/new", (req, res, next) => {
  // res.send("s");
  res.send("new");
});

router.get("/:votingId", async (req, res, next) => {
  const { votingId } = req.params;
  const voting = await Voting.findOne({ _id: votingId });
  const {
    author,
    title,
    description,
    votingItem,
    voters,
    startTime,
    endTime,
  } = voting;

  const startLocalTime = getLocalTime(startTime);
  const endLocalTime = getLocalTime(endTime);
  const isClosed = getProgress(endTime);

  res.status(200).render("votingDetail", {
    author,
    title,
    description,
    votingItem,
    voters,
    startLocalTime,
    endLocalTime,
    isClosed,
  });
});

module.exports = router;
