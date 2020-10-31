const VotingService = require('../../services/voting.service');
const votingService = new VotingService();
const hasVoted = require('../../utils/hasVoted');
const tryCatchWrapper = require('../../utils/tryCatchWrapper');
const { OK } = require('../../constants');
const { VOTED } = require('../../constants/messages');

const checkHasVoted = tryCatchWrapper(async (req, res, next) => {
  const currentUser = req.session.userId;
  const voting = await votingService.getVoting(req.params._id);

  if (hasVoted(voting.options, currentUser)) {
    res.json({
      result: OK,
      message: VOTED,
    });

    return;
  }
  next();
});

module.exports = checkHasVoted;
