const createError = require('http-errors');
const User = require('../models/User');

exports.updateRegisterVoting = async (req, res, next) => {
  const userId = req.user._id;
  const votingId = res.locals.newVoting;
  try {
    await User.updateOne(
      { _id: userId },
      { $push: { registerVotings: votingId } }
    );
    res.json('ok');
  } catch(err) {
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};

exports.updateParticipateVoting = async (req, res, next) => {
  const userId = req.user._id;
  const votingId = req.params.voting_id;
  const selectedOption = req.body.option;
  try {
    await User.updateOne(
      { _id: userId },
      { $push: { participateVotings: { voting: votingId, selectedOption } } }
    );
    next();
  } catch(err) {
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};

exports.checkRespondent = async (req, res, next) => {
  if (!req.user) return next();

  const userId = req.user._id;
  const votingId = req.params.voting_id;
  try {
    const voting = await User.findById(userId).populate('participateVotings.voting._id').lean();
    const participateList = voting.participateVotings;
    let isRespondent = false;
    let selectedOption = null;

    for (let i = 0; i < participateList.length; i++) {
      if (String(participateList[i].voting) === votingId) {
        isRespondent = true;
        selectedOption = participateList[i].selectedOption;
      }
    }
    res.locals.isRespondent = isRespondent;
    res.locals.selectedOption = selectedOption;
    next();
  } catch(err) {
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
};
