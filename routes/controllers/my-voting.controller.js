const User = require('../../models/User');
const { calculateDate } = require('../utils');

exports.getAllMyVotes = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;
    const myVotes = await User.findById(currentUserId).populate('my_votings').lean();

    myVotes.my_votings.map(vote => {
      return vote.due_date = calculateDate(vote.due_date);
    });
    req.myVotes = myVotes.my_votings;
    next();
  } catch (error) {
    next(error);
  }
};
