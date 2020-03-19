const Votes = require('../models/Votes');

module.exports = checkExpiration = async (req, res, next) => {
  const votes = await Votes.find().populate('created_by');

  votes.forEach(async vote => {
    const voteExpiresAt = vote.expires_at.toISOString();
    const now = new Date().toISOString();

    if (voteExpiresAt < now) {
      await vote.updateOne({ expired: true });
    }
  });

  res.locals.votes = votes;
  next();
};
