const mongoose = require('mongoose');

exports.validateVotingId = function (req, res, next) {
  const votingId = req.params.voting_id;

  if (!mongoose.isValidObjectId(votingId)) {
    return res.status(400).json({ error: '유효하지 않은 투표입니다.' });
  } else {
    next();
  }
};
