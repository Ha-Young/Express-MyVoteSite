const express = require("express");
const createError = require("http-errors");
const Voting = require("../models/Voting");
const getLoginStatus = require("../utils/getLoginStatus");
const router = express.Router();

router.post("/selection", async (req, res, next) => {
  const isLogin = getLoginStatus(req);
  if (!isLogin) return res.status(403).end();

  try {
    const { votingId, optionId } = req.body;
    const voting = await Voting.findOne({ _id: votingId });
    const { voters } = voting;
    const { _id } = req.user;

    if (voters.includes(_id)) {
    } else {
    }

    voters.push(_id);
    option = voting.votingItems.id(optionId);
    option.count += 1;

    await voting.save();

    res.status(200).json({ count: option.count });
  } catch (err) {
    console.log(`post /selection ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

router.post("/deleteVoting", async (req, res, next) => {
  const isLogin = getLoginStatus(req);
  if (!isLogin) return res.status(403).end();
  // 사용자 권한 넣을것...

  try {
    const { votingId } = req.body;
    console.log(votingId);
    const voting = await Voting.deleteOne({ _id: votingId });
    res.status(200).end();
  } catch (err) {
    console.log(`post /changeVotingCount ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

module.exports = router;
