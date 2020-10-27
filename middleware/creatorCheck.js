const Voting = require('../model/Voting');

const creatorCheck = async (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    return next();
  }

  const votingId = req.params.voting_id;
  const userId = req.session.user._id;
  const isCreator = await Voting.findOne({ $and: [{ creator: userId,}, {_id: votingId,},],});

  res.locals.isCreator = isCreator;

  next();
};

module.exports = creatorCheck;
