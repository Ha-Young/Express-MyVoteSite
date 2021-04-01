const Vote = require("../models/Vote");

exports.getMainPage = async (req, res) => {
  const votes = await Vote.find()
  const currentDate = new Date();
  const endedVote = [];
  const progressingVote = [];

  const isUserLogedIn = !!req.headers.cookie;

  votes.forEach(vote => {
    if (vote.endDate <= currentDate) {
      vote.isOnVote = false;
      endedVote.push(vote);
    } else {
      progressingVote.push(vote);
    }

    vote.save();
  });

  res.render("index", { progressingVote, endedVote, isUserLogedIn });
};
