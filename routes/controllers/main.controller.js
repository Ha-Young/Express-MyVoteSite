const AuthService = require('../../services/AuthService');
const VoteService = require('../../services/VoteService');
const VIEWS = require('../../config/constants').VIEWS;

exports.renderAllVotings = async function renderAllVotings(req, res, next) {
  try {
    const votingList = await VoteService.getVotings();
    res.render(VIEWS.HOME, { user: req.session.user, votingList });
  } catch (error) {
    next(error);
  }
};

exports.renderMyVotings = async function renderMyVotings(req, res, next) {
  const { session } = req;
  try {
    const user = await AuthService.findUser(session.user._id);
    res.render(VIEWS.MY_VOTINGS, { user: session.user, votingList: user.myVoteList });
  } catch (error) {
    next(error);
  }
};
