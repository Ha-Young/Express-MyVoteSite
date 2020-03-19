const Votes = require('../models/Votes');

module.exports = updateVoteExpiration = async (req, res, next) => {
  const allVotes = await Votes.find().populate('created_by');

  allVotes.forEach(async vote => {
    const voteExpirationTime = vote.expires_at.toISOString();
    const currentTime = new Date().toISOString();

    if (voteExpirationTime < currentTime) {
      await vote.updateOne({ expired: true });
    }
  });

  res.locals.allVotes = allVotes;
  next();
};
