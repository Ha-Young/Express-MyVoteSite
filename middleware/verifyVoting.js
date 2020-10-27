const Voting = require('../model/Voting');

const verifyVoting = async (req, res, next) => {
  const userId = req.session.user._id;
  const isExist = await Voting.findOne({ 'polls.voted_users': userId, });

  console.log('isExist', isExist);

  if (isExist) {
    res.redirect(`/votings/${req.params.voting_id}`);
  } else {
    next();
  }
};

module.exports = verifyVoting;
