const Voting = require('../model/Voting');

const saveUserPoll = async (req, res, next) => {
  const userId = req.session.user._id;
  const pollId = req.params.poll_id;

  await Voting.updateOne(
    { 'polls._id': pollId, },
    { $addToSet: { 'polls.$[poll].voted_users': userId, },},
    { arrayFilters: [{ 'poll._id': pollId, },],
  });

  next();
};

module.exports = saveUserPoll;
