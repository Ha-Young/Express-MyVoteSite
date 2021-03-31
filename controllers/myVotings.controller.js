const Voting = require('../models/Voting');

exports.getMyVotings = async function (req, res, next) {
  const now = new Date();
  await Voting.updateExpiredVotingStatus(now);

  const votings = await Voting.find({ author: req.user });

  res.render('myVotings', { votings })
};
