const Voting = require('../../models/Voting');
const User = require('../../models/User');
const { registerErrorMessage } = require('../../constants');
const {
  OPTIONS_NOT_ENOUGH,
  PREVIOUS_TIME_NOT_ALLOWED,
} = registerErrorMessage;
const { calculateDate, checkPassedDate } = require('../utils');

exports.validateInputs = (req, res, next) => {
  const { optionTitle, dueDate } = req.body;

  if (!optionTitle || typeof optionTitle === 'string' || optionTitle.length < 2) {
    req.flash('message', OPTIONS_NOT_ENOUGH);
    return res.redirect('/votings/new');
  }

  if (checkPassedDate(dueDate)) {
    req.flash('message', PREVIOUS_TIME_NOT_ALLOWED);
    return res.redirect('/votings/new');
  }

  next();
};

exports.createNewVoting = async (req, res, next) => {
  const { title, optionTitle, dueDate } = req.body;
  const userId = req.user._id;
  const options = [];

  optionTitle.forEach(option => {
    options.push({ optionTitle: option, votedCount: [] });
  });

  try {
    const newVoting = await Voting.create({
      title,
      writer: userId,
      due_date: dueDate,
      options,
      voter: [],
    });

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { myVotings: newVoting.userId } }
    );
    next();
  } catch (error) {
    next(error);
  }
};

exports.getTargetVoting = async (req, res, next) => {
  try {
    const votingId = req.params.voting_id;
    const targetVoting = await Voting.findById(votingId).populate('writer').lean();

    targetVoting.due_date = calculateDate(targetVoting.due_date);
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
    const votedUsers = await Voting.findById(votingId, 'voter');
    if (votedUsers.voter.includes(userId)) {
      req.flash('message', 'you have already voted.')
      return next();
    }

    await Voting.findOneAndUpdate(
      { 'options._id': optionId },
      { $addToSet: { 'options.$[option].votedCount': req.user._id } },
      { arrayFilters: [{ 'option._id': optionId }] },
    );

    await Voting.findByIdAndUpdate(
      votingId,
      { $addToSet: { voter: req.user._id } }
    );

    next();
  } catch (error) {
    next(error);
  }
};

exports.deleteVoting = async (req, res, next) => {
  try {
    const { voting_id } = req.params;
    await User.update(
      { 'myVotings': voting_id },
      { $pull: { 'myVotings': voting_id } },
    );
    await Voting.findOneAndDelete(voting_id);
    next();
  } catch (error) {
    next(error);
  }
};

exports.checkValidVoting = async (req, res, next) => {
  const dueDate = req.targetVoting.due_date;

  if (checkPassedDate(dueDate)) {
    return res.redirect(`/votings/result/${req.params.voting_id}`);
  }
  next();
};

exports.checkAuthorization = async (req, res, next) => {
  const currentUserId = req.user && req.user._id;
  const targetDetails = req.targetVoting;
  const currentVoteWriterId = targetDetails.writer._id;
  const dueDate = targetDetails.due_date;
  const isIdsMatched = req.user
    ? currentVoteWriterId.equals(currentUserId)
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
