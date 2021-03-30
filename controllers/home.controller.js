const Voting = require('../models/Voting');

exports.getVotings = async function (req, res, next) {
  await Voting.updateExpiredVotingStatus()
  // TODO 이것도 static methods로 옮길까...
  const votings = await Voting.find().lean().populate('author');

  res.render('home', { votings });
};
