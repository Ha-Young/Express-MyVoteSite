const Vote = require('../../models/Vote');
const { deletedVote } = require('../../constants/err-messages');

exports.isDeleted = async function(req, res, next) {
  try {
    const vote = await Vote.findById(req.params.id).populate('creator_id', 'name');

    if (vote) {
      res.locals.vote = vote;
      next();
    } else {
      throw new Error(deletedVote);
    }
  } catch(err) {
    next(err);
  }
};

exports.isVoted = async function(req, res, next) {
  try {
    const { vote } = res.locals;
    const voted = vote.options.find(option => option.voting_users.includes(req.user._id));
    const totalContributors = vote.options.reduce((a, option) => a + option.voting_users.length, 0);
    const now = new Date();
    const isInProgress = vote.end_date > now;
    const isCreator = req.user._id.toString() === vote.creator_id._id.toString();
    const counts = vote.options.map(option => option.voting_users);

    res.locals = {
      vote: vote,
      totalContributors: totalContributors,
      isInProgress: isInProgress,
      isCreator: isCreator,
      counts: counts
    };

    if (!voted) {
      return next();
    }

    res.render(
      'vote',
      {
        vote,
        counts,
        totalContributors,
        isInProgress,
        isCreator,
        message: true
      }
    );

  } catch(err) {
    next(err);
  }
};
