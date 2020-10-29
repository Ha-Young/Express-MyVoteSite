const User = require('../../models/User');
const { calculateDate } = require('../utils');

exports.getAllMyVotes = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;
    const myVotes = await User.findById(currentUserId).populate('myVotings').lean();

    myVotes.myVotings.map(vote => {
      return vote.due_date = calculateDate(vote.due_date);
    });

    req.myVotes = myVotes.myVotings;
    next();
  } catch (error) {
    next(error);
  }
};

exports.renderMyVotings = (req, res, next) => {
  const myVotes = req.myVotes;
  res.render('my-votings', { myVotes });
};
