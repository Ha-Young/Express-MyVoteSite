const express = require("express");
const router = express.Router();
const Voting = require("../models/Voting");

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

  const getLocalTime = (ISOTime) => {
    const year = ISOTime.getFullYear();
    const month = ISOTime.getMonth() + 1;
    const date = ISOTime.getDate();
    const hour = ISOTime.getHours();
    const minute = ISOTime.getMinutes();

    const localTime = {
      year,
      month,
      date,
      hour,
      minute,
    };

    return localTime;
  };

  const getProgress = (ISOTime) => {
    if (ISOTime.getTime() > new Date().getTime()) {
      return false;
    }

    return true;
  };

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
