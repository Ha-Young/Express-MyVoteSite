const Voting = require('../models/Voting');

exports.getMyVotings = async function (req, res, next) {
  await Voting.updateExpiredVotingStatus(new Date());

  const votings = await Voting.find({ author: req.user });

  res.render('myVotings', { votings })
};
