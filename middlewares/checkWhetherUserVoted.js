const Votes = require('../models/Votes');

module.exports = checkWhetherUserVoted = async (req, res, next) => {
  const { loggedInUser } = res.locals;

  const { id: vote_id } = req.params;
  const currentVote = await Votes.findOne({ vote_id });
  const { _id } = currentVote;

  if (loggedInUser.votes_voted.indexOf(_id) > 0) {
    return res.send('이미 투표하셨습니다!');
  }

  next();
};
