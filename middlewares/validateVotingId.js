const mongoose = require('mongoose');

exports.validateVotingId = async function (req, res, next) {
  const votingId = req.params.voting_id;

  if (!mongoose.isValidObjectId(votingId)) {
    return res.json({ error: 400 });
  } else {
    req.votingId = votingId;

    next();
  }
};
