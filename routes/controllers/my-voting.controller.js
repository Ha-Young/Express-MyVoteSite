const User = require('../../models/User');
const Vote = require('../../models/Vote');

exports.getAllMyVotes = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;
    const myVotes = await User.findById(currentUserId).populate('my_votings');
    req.myVotes = myVotes.my_votings;
    next();
  } catch (error) {
    next(error);
  }
};
