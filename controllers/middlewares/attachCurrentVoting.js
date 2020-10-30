const VotingService = require('../../services/voting');

const attachCurrentVoting = async (req, res, next, id) => {
  req.votingInstance = new VotingService(id);
  next();
};

module.exports = attachCurrentVoting;
