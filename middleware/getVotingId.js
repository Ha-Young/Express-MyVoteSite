const getVotingId = async (req, res, next) => {
  res.locals.votingId = req.params.voting_id;

  next();
};

module.exports = getVotingId;
