const Votes = require('../models/Votes');

module.exports = checkWhetherUserVoted = async (req, res, next) => {
  const { loggedInUser } = res.locals;
  const currentVote = await Votes.findById(req.params.id);

  if (loggedInUser.votes_voted.indexOf(currentVote._id) > 0) {
    return res.send('이미 투표하셨습니다!');
  }

  next();
};
