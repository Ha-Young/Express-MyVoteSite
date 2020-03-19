const Vote = require('../models/Vote');

exports.votingAuthorization = async (req, res, next) => {
  const { vote_id } = req.params;
  const a = await Vote.find(
    { _id: vote_id },
    { participants: [ req.user._id ] }
  );

  if (a[0].participants.length > 0) {
    res.locals.isParticipated = true;
  } else {
    res.locals.isParticipated = false;
  }
  next();
};
