const Voting = require('../model/Voting');

const deleteVoting = async (req, res, next) => {
  try {
    const votingId = req.params.voting_id;
    await Voting.findByIdAndDelete(votingId);

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = deleteVoting;
