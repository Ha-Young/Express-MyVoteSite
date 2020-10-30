const createError = require('http-errors');
const { validationResult } = require('express-validator');

const VIEWS = require('../constants/views');
const ROUTES = require('../constants/routes');

const User = require('../models/User');
const Voting = require('../models/Voting');

const { convertToVotingObject } = require('../util/voting');

exports.getAll = async (req, res, next) => {
  try {
    const votings = await Voting.find()
      .sort({ expiration: -1 })
      .populate('author');
    return res.render(VIEWS.INDEX, { title: 'MAIN', votings });
  } catch (err) {
    next(err);
  }
};

exports.getAllMyVotings = async (req, res, next) => {
  const { user } = req;

  try {
    const currentUser = await User.findById(user._id).populate('myVotings');
    const votings = currentUser.myVotings.sort(
      (a, b) => b.expiration - a.expiration
    );

    res.render(VIEWS.INDEX, {
      title: 'My Votings',
      isMyVotings: true,
      votings,
    });
  } catch (err) {
    next(err);
  }
};

exports.getNewVoting = (req, res, next) => {
  res.render(VIEWS.NEW, { title: 'Create New Voting' });
};

exports.postNewVoting = async (req, res, next) => {
  const validationErrors = validationResult(req).array();
  const { user, body } = req;

  if (validationErrors) {
    return res.render(VIEWS.NEW, {
      title: 'Create New Voting',
      validationErrors,
    });
  }

  try {
    const newVotingObject = convertToVotingObject(user._id, body);
    const newVoting = await Voting.create(newVotingObject);

    const currentUser = await User.findById(_id);
    currentUser.myVotings.addToSet(newVoting._id);
    await currentUser.save();

    res.redirect(ROUTES.HOME);
  } catch (error) {
    next(error);
  }
};

exports.deleteVoting = async (req, res, next) => {
  const { user, voting } = req;

  if (!user || !voting) return next(createError('no user or voting'));

  if (voting.isMine(user._id)) {
    const deletedVoting = await Voting.findByIdAndDelete(voting._id);
    const currentUser = await User.findById(user._id);

    currentUser.myVotings.pull(voting._id);
    await currentUser.save();
    return res.status(200).json({
      displayName: currentUser.displayName,
      topic: deletedVoting.topic,
    });
  }

  next('403포비든!');
};

exports.getVoting = async (req, res, next) => {
  const { user, voting } = req;

  if (!voting) return next(createError('no voting'));

  try {
    const hasAdminPermission = user && voting.isMine(user._id);
    const hasParticipated = user && voting.isParticipated(user._id);
    await voting.execPopulate('author');

    let sortedOptions = voting.options;
    if (!voting.isOngoing) {
      const { options } = voting;
      const maxCount = Math.max(...options.map(option => option.count));
      sortedOptions = options
        .sort((a, b) => b.count - a.count)
        .map(option => ({
          content: option.content,
          count: option.count,
          elected: option.count === maxCount,
        }));
    }

    res.render(VIEWS.VOTING, {
      title: 'Voting Detail',
      voting,
      sortedOptions,
      hasAdminPermission,
      hasParticipated,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateVoting = async (req, res, next) => {
  const {
    user,
    voting,
    body: { selectedOptionId },
  } = req;

  const added = voting.voters.addToSet(user._id);
  await voting.save();

  const selectedOption = voting.options.find(
    option => option._id.toString() === selectedOptionId
  );

  if (added) {
    selectedOption.count += 1;
    await voting.save();
  }

  return res.status(200).json({
    topic: voting.topic,
    selectedOption: selectedOption.content,
  });
};
