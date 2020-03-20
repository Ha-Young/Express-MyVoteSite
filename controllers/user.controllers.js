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
  );
  next();
};

exports.checkRespondent = async (req, res, next) => {
  if(!req.user) return next();

  const userId = req.user._id;
  const votingId = req.params.voting_id;
  const voting = await User.findById(userId).populate('participateVotings.voting._id').lean();
  const participateList = voting.participateVotings;
  let isRespondent = false;
  let selectedOption = null;

  for(let i = 0; i < participateList.length; i++) {
    if(String(participateList[i].voting) === votingId) {
      isRespondent = true;
      selectedOption = participateList[i].selectedOption;
    }
  }
  req.isRespondent = isRespondent;
  req.selectedOption = selectedOption;
  next();
};
