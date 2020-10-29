const Voting = require('../../models/votingsModel')

module.exports = async (req, res, next) => {
  console.log('after fetch in handleFetch controller');

  const selectedOptionId = req.body.data;
  const votingId = req.params.id
  const userId = req.session.user_id;
  const voting = await Voting.findById(votingId);
  voting.selectOptions.forEach((selectOption) => {
    if (selectOption._id.toString() === selectedOptionId) {
      selectOption.votedUsers.push(userId);
    }
  })
  await voting.save();
  req.body.voting = voting;

  next();
};