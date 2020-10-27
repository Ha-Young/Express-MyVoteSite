const Voting = require('../model/Voting');

const deleteVoting = async (req, res, next) => {
  const votingId = req.params.voting_id;
  await Voting.findByIdAndDelete(votingId);

  next();
};

module.exports = deleteVoting;
