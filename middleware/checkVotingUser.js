const Voting = require('../model/Voting');

const checkVotingUser = async (req, res, next) => {
  const votingId = req.params.voting_id;
  const user = res.locals.user;

  if (user) {
    const isVotingUser = await Voting.exists({ $and: [{ _id: votingId, }, { 'polls.voted_users': user._id, },],});

    if (isVotingUser) {
      res.locals.isVotingUser = true;
    }
  }

  next();
};

module.exports = checkVotingUser;
