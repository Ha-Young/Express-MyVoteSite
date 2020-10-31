const VoteService = require('../../../services/VoteService');
const changeDateForm = require('../../utils/changeDateForm');
const { TEMPLATE } = require('../../../config/constants');

exports.GETHome = async (req, res, next) => {
  try {
    const items = await VoteService.getInProgress();
    changeDateForm(items);

    return res.render(TEMPLATE.HOME, { voteItems: items });
  } catch (error) {
    next(error);
  }
};
exports.GETExpireds = async (req, res, next) => {
  try {
    const items = await VoteService.getExpired();
    changeDateForm(items);

    return res.render(TEMPLATE.EXPIRED, { voteItems: items });
  } catch (error) {
    return next(error);
  }
};
exports.GETMyVotings = async (req, res, next) => {
  try {
    const userId = req.user;
    const items = await VoteService.getMyVoting(userId);
    changeDateForm(items);

    return res.render(TEMPLATE.MYVOTINGS, { voteItems: items });
  } catch (error) {
    return next(error);
  }
};
