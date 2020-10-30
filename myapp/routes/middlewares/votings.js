const Voting = require('../../models/Voting');

exports.getAllVotings = async (req, res, next) => {
  try {
    const votingList = await Voting.find().lean();
    req.votingList = votingList;
    next();
  } catch (err) {
    next(err);
  }
};

exports.getMyVoting = async (req, res, next) => {
  try {
    const myVotingList = await Voting.find({ author: req.user.email }).exec();
    req.myVotingList = myVotingList;
    next();
  } catch (err) {
    next(err);
  }
};

exports.getTargetVoting = async (req, res, next) => {
  try {
    const targetVoting = await Voting.findById(req.params.id).exec();
    req.targetVoting = targetVoting;
    next();
  } catch (err) {
    next(err);
  }
};
