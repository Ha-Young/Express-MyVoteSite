const votingService = require('../../services/voting.service');
const { checkPassedDate, checkAlreadyVoted, checkIsIdsMatcehd } = require('../../utils');
const { otherMessage: { ALREADY_VOTED, RESULT_OK } } = require('../../constants');

exports.createNewVoting = async (req, res, next) => {
  const {
    title,
    ['option-title']: optionTitle,
    ['due-date']: dueDate
  } = req.body;
  const userId = req.user._id;

  const mappedOptions = optionTitle.map(option => {
    return { optionTitle: option, votedCount: [] };
  });

  const votingInfo = {
    title,
    writer: userId,
    dueDate,
    options: mappedOptions,
    voter: [],
  };

  try {
    const newVoting = await votingService.createNewVoting(votingInfo);
    await votingService.updateUserVotings(userId, newVoting);
    next();
  } catch (error) {
    next(error);
  }
};

exports.getTargetVoting = async (req, res, next) => {
  try {
    const votingId = req.params.voting_id;
    const targetVoting = await votingService.getTargetVoting(votingId);
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
    const hasAlreadyVoted = await votingService.checkAlreadyVoted(votingId, userId);
    if (hasAlreadyVoted) {
      req.flash('message', ALREADY_VOTED);
      return next();
    }

    await votingService.updateVotedCount(optionId, userId);
    await votingService.updateTotalVoters(votingId, userId);
    next();
  } catch (error) {
    next(error);
  }
};

exports.deleteVoting = async (req, res, next) => {
  try {
    const votingId = req.params.voting_id;
    await votingService.deleteUserVotings(votingId);
    await votingService.deleteVoting(votingId);
    next();
  } catch (error) {
    next(error);
  }
};

exports.checkParticipatingVoting = async (req, res, next) => {
  const userId = req.user && req.user._id;
  const votingId = req.params.voting_id;
  const { dueDate, voter: voterList } = req.targetVoting;
  req.hasAlreadyVoted = checkAlreadyVoted(voterList, userId);

  if (checkPassedDate(dueDate)) {
    return res.redirect(`/votings/result/${votingId}`);
  }
  next();
};

exports.checkAuthorization = async (req, res, next) => {
  const userId = req.user && req.user._id;
  const targetDetails = req.targetVoting;
  const { dueDate, voter: voterList, writer } = targetDetails;
  const currentVotingWriterId = writer._id;

  const isIdsMatched = checkIsIdsMatcehd(userId, currentVotingWriterId);
  const hasAlreadyVoted = checkAlreadyVoted(voterList, userId);

  if (isIdsMatched) {
    return res.render('voting-result', {
      targetDetails, isIdsMatched,
    });
  }

  if (checkPassedDate(dueDate)) {
    return res.render('voting-result', {
      targetDetails, isIdsMatched,
    });
  } else {
    return res.render('voting-details', {
      targetDetails, isIdsMatched, hasAlreadyVoted,
    });
  }
};

exports.renderVotingRegister = (req, res, next) => {
  const message = req.flash('message');
  res.render('voting-register', { message });
};

exports.renderVotingDetails = (req, res, next) => {
  const targetDetails = req.targetVoting;
  const hasAlreadyVoted = req.hasAlreadyVoted;
  const isIdsMatched = req.user
    ? targetDetails.writer._id.equals(req.user._id)
    : false;

  res.render('voting-details', { targetDetails, isIdsMatched, hasAlreadyVoted });
};

exports.responseSuccessResult = (req, res, next) => {
  res.status(200).json({ result: RESULT_OK });
};
