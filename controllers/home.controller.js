const Voting = require('../models/Voting');

exports.getVotings = async function (req, res, next) {
  const now = new Date();
  await Voting.updateExpiredVotingStatus(now);

  // TODO 이것도 static methods로 옮길까...
  // TODO home에서 최다득표를 보여줄 필요는 없나보네?? 빼자...
  const votings = await Voting.find().populate('author');

  res.render('home', { votings });
};
