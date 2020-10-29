const Voting = require('../../models/Voting');
const User = require('../../models/User');
const { calculateDate, checkPassedDate } = require('../../utils');
const VotingService = require('../../services/voting.service');

exports.createNewVoting = async (req, res, next) => {
  const { title, optionTitle, dueDate } = req.body;
  const userId = req.user._id;
  const options = [];

  optionTitle.forEach(option => {
    options.push({ optionTitle: option, votedCount: [] });
  });

  const votingInfo = {
    title,
    writer: userId,
    dueDate,
    options,
    voter: [],
  };

  try {
    const newVoting = await VotingService.createNewVoting(votingInfo);
    await VotingService.updateUserVotings(userId, newVoting);
    next();
  } catch (error) {
    next(error);
  }
};

exports.getTargetVoting = async (req, res, next) => {
  try {
    const votingId = req.params.voting_id;
    const targetVoting = await VotingService.getTargetVoting(votingId);
    req.targetVoting = targetVoting;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateVoteCount = async (req, res, next) => {
  const { votingId, optionId } = req.body;
  const userId = req.user._id;

  try {
    const hasAlreadyVoted = await VotingService.checkAlreadyVoted(votingId, userId);
    if (hasAlreadyVoted) {
      req.flash('message', 'you have already voted.')
      return next();
    }

    await VotingService.updateVotedCount(optionId, userId);
    await VotingService.updateTotalVoters(votingId, userId);
    next();
  } catch (error) {
    next(error);
  }
};

exports.deleteVoting = async (req, res, next) => {
  try {
    const votingId = req.params.voting_id;
    await VotingService.deleteUserVotings(votingId);
    await VotingService.deleteVoting(votingId);
    next();
  } catch (error) {
    next(error);
  }
};

// 여기서부터 DB 로직 없음
exports.checkValidVoting = async (req, res, next) => {
  const dueDate = req.targetVoting.dueDate;

  if (checkPassedDate(dueDate)) {
    return res.redirect(`/votings/result/${req.params.voting_id}`);
  }
  next();
};

exports.checkAuthorization = async (req, res, next) => {
  const currentUserId = req.user && req.user._id;
  const targetDetails = req.targetVoting;
  const currentVotingWriterId = targetDetails.writer._id;
  const dueDate = targetDetails.dueDate;
  const isIdsMatched = req.user
    ? currentVotingWriterId.equals(currentUserId)
    : false;

  if (isIdsMatched) {
    return res.render('voting-result', {
      targetDetails, isIdsMatched
    });
  }

  if (checkPassedDate(dueDate)) {
    return res.render('voting-result', {
      targetDetails, isIdsMatched
    });
  } else {
    return res.render('voting-details', {
      targetDetails, isIdsMatched
    });
  }
};

exports.renderVotingRegister = (req, res, next) => {
  const message = req.flash('message');
  res.render('voting-register', { message });
};

exports.renderVotingDetails = (req, res, next) => {
  const targetDetails = req.targetVoting;
  const isIdsMatched = req.user
    ? targetDetails.writer._id.equals(req.user._id)
    : false;

  res.render('voting-details', { targetDetails, isIdsMatched });
};
