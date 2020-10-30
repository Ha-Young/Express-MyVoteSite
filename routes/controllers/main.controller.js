const AuthService = require('../../services/AuthService');
const VoteService = require('../../services/VoteService');
const VIEWS = require('../../config/constants').VIEWS;

exports.getVotings = async function getVotings(req, res, next) {
  try {
    const votingList = await VoteService.getVotings();
    res.render(VIEWS.HOME, { user: req.session.user, votingList });
  } catch (error) {
    next(error);
  }
};

exports.getMyVotings = async function getMyVotings(req, res, next) {
  try {
    const user = await AuthService.findUser(session.user._id);
    res.render(VIEWS.MY_VOTINGS, { user: req.session.user, votingList: user.myVoteList });
  } catch (error) {
    next(error);
  }
};
