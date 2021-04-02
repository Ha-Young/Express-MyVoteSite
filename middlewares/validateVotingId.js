const mongoose = require('mongoose');

exports.validateVotingId = function (req, res, next) {
  const votingId = req.params.voting_id;

  if (!mongoose.isValidObjectId(votingId)) {
    return res.status(400).json({ error: 400 });
  } else {
    req.votingId = votingId;

    next();
  }
};
