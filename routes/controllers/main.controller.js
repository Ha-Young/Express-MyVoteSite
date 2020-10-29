const AuthService = require('../../services/AuthService');
const VoteService = require('../../services/VoteService');

exports.getVotings = async function getVotings(req, res, next) {
  try {
    const votingList = await VoteService.getVotings();
    res.render('index', { user: req.session.user, votingList });
  } catch (error) {
    next(error);
  }
};

exports.getMyVotings = async function getMyVotings(req, res, next) {
  const { session } = req;
  try {
    const user = await AuthService.findUser(session.user._id);
    res.render('myVotings', { user: session.user, votingList: user.myVoteList });
  } catch (error) {
    next(error);
  }
};
