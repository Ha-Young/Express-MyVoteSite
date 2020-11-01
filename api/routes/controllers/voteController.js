const VoteService = require('../../../services/VoteService');
const { TEMPLATE, ROUTES_GLOBAL } = require('../../../config/constants');

exports.GETNew = (req, res, next) => {
  return res.render(TEMPLATE.CREATEVOTING);
};
exports.POSTNew = async (req, res, next) => {
  const userId = req.user;
  const { title, description, choice, date } = req.body;
  const voteItem = {
    authorId: userId,
    title: title,
    description: description,
    choiceList: choice,
    expiredDate: new Date(date).getTime(),
  };

  try {
    const result = await VoteService.create(voteItem);

    if (result) return res.redirect(ROUTES_GLOBAL.HOME);
  } catch (error) {
    next(error);
  }
};
exports.GETVotings = async (req, res, next) => {
  const { votingId } = req.params;
  const userId = req.user;

  try {
    const item = await VoteService.getContents(votingId, userId);

    if (String(item.authorId) === String(userId)) return res.render(TEMPLATE.VOTING, { voteItem: item, canDelete: true });
    return res.render(TEMPLATE.VOTING, { voteItem: item });
  } catch (error) {
    next(error);
  }
};
exports.PUTVotings = async (req, res, next) => {
  const { votingId } = req.params;
  const userId = req.user;
  const { choice } = req.body;

  try {
    const voteResult = await VoteService.setVoting(votingId, userId, choice);

    return res.json({ result: voteResult });
  } catch (error) {
    return next(error);
  }
};
exports.DELETEVotings = async (req, res, next) => {
  const { votingId } = req.params;

  try {
    await VoteService.deleteVoting(votingId);
    res.json({
      result: true,
    });
  } catch (error) {
    return next(error);
  }
};
