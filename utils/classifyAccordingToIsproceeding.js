const Vote = require('../models/vote');

async function classifyAccordingToIsproceeding(votes) {
  const expiredVote = [];
  const validatedVote = [];

  for (let i = 0; i < votes.length; i++) {
    if (votes[i].expiredAt < new Date()) {
      expiredVote.push(votes[i]);
      await Vote.findByIdAndUpdate(votes[i]._id, { isProceeding: false }, { new: true });

    } else {
      validatedVote.push(votes[i]);
    }
  }

  return { expiredVote, validatedVote };
}

module.exports = classifyAccordingToIsproceeding;
