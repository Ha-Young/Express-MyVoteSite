const Vote = require("../models/Vote");

exports.getMainPage = async (req, res) => {
  const votes = await Vote.find()
  const currentDate = new Date();

  const isUserLogedIn = !!req.headers.cookie;

  votes.forEach(vote => {
    if (vote.endDate <= currentDate) {
      vote.isOnVote = false;
    }

    vote.save();
  });

  res.render("index", { votes, isUserLogedIn });
};
