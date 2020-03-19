const User = require('../models/User');

exports.updateRegisterVoting = async (req, res, next) => {
  const userId = req.user._id;
  const votingId = req.newVoting;

  await User.updateOne(
    { _id: userId },
    { $push: { registerVotings: votingId } }
  );
  res.json('ok');
};

exports.updateParticipateVoting = async (req, res, next) => {
  const userId = req.user._id;
  const votingId = req.params.voting_id;
  const selectedOption = req.body.option;

  await User.updateOne(
    { _id: userId },
    { $push: { participateVotings: { voting: votingId, selectedOption } } }
  )
  next();
};
