const Vote = require('../../models/Vote');
const User = require('../../models/User');

exports.getVotings = async function getVotings(req, res, next) {
  try {
    // const votingList = await Vote.find().populate('author', 'name').lean().exec();
    const votingList = await Vote.find().populate('author', 'name');
    console.log(req.session.user);
    res.render('index', { user: req.session.user, votingList, message: req.flash('success') });
  } catch (error) {
    next(error);
  }
};

exports.getMyVotings = async function getMyVotings(req, res, next) {
  const { session } = req;
  try {
    const user = await User.findById(session.user._id).populate('myVoteList');
    res.render('myVotings', { user: req.session.user, votingList: user.myVoteList });
  } catch (error) {
    next(error);
  }
};
