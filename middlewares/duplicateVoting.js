const Vote = require('../models/Vote');

exports.duplicateVoting = async (req, res, next) => {
  if (!req.user) {
    next();
  }

  const { vote_id } = req.params;
  const vote = await Vote.find(
    { _id: vote_id },
    { participants: [ req.user._id ] }
  );

  if (vote[0].participants.length > 0) {
    res.locals.isParticipated = true;
  } else {
    res.locals.isParticipated = false;
  }
  next();
};
