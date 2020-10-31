const VoteService = require('../../../services/VoteService');
const changeDateForm = require('../../utils/changeDateForm');

exports.GETHome = async (req, res, next) => {
  try {
    const items = await VoteService.getInProgress();
    changeDateForm(items);

    return res.render('home', { voteItems: items });
  } catch (error) {
    next(error);
  }
};
exports.GETExpireds = async (req, res, next) => {
  try {
    const items = await VoteService.getExpired();
    changeDateForm(items);

    return res.render('expired', { voteItems: items });
  } catch (error) {
    return next(error);
  }
};
exports.GETMyVotings = async (req, res, next) => {
  try {
    const userId = req.user;
    const items = await VoteService.getMyVoting(userId);
    changeDateForm(items);

    return res.render('myVotings', { voteItems: items });
  } catch (error) {
    return next(error);
  }
};
