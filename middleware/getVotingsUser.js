const Voting = require('../model/Voting');

const getVotingsUser = async (req, res, next) => {
  const userId = req.session.user._id;
  const votings = await Voting.find({ creator: userId, });

  res.locals.votings = votings;

  next();
};

module.exports = getVotingsUser;
