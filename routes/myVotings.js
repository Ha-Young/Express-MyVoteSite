const express = require("express");
const Users = require("../models/Users");

const checkAuthentication = require("../middlewares/authenticate");
const { getDisplayInfo, sortVotesByExpiration } = require("../lib/helpers");

const router = express.Router();

router.get("/", checkAuthentication, async (req, res) => {
  const loggedInUser = await Users.findById(req.user._id).populate({
    path: "votes_created",
    populate: { path: "created_by" }
  });

  const allVotes = loggedInUser.votes_created;
  const voteDisplayInfoList = [];
  let expiredVotesCounter = 0;

  allVotes.forEach(vote => {
    if (vote.expired) expiredVotesCounter++;
    voteDisplayInfoList.push(getDisplayInfo(vote));
  });

  const sortedVoteList = sortVotesByExpiration(voteDisplayInfoList);

  res.render("home", {
    loggedInUser,
    allVotes: sortedVoteList,
    expiredVotesCounter
  });
});

module.exports = router;
