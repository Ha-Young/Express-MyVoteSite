const createError = require('http-errors');
const { validationResult } = require('express-validator');

const VotingService = require('../services/voting');

const VIEWS = require('../constants/views');
const ROUTES = require('../constants/routes');

const { getSortedOptions } = require('../util/voting');

exports.getAll = async (req, res, next) => {
  try {
    const votings = await VotingService.getAll('expiration');

    return res.render(VIEWS.INDEX, { title: 'MAIN', votings });
  } catch (error) {
    next(error);
  }
};

exports.getAllMyVotings = async (req, res, next) => {
  const { user } = req;

  try {
    const votings = await VotingService.byUserId(user._id, 'expiration');
    return res.render(VIEWS.INDEX, { title: 'My Votings', votings, showCreator: false });
  } catch (error) {
    next(error);
  }
};

exports.getNewVoting = (req, res, next) => {
  return res.render(VIEWS.NEW, { title: 'Create New Voting' });
};

exports.postNewVoting = async (req, res, next) => {
  const validationErrors = validationResult(req).array();
  const { user, body: userInputs } = req;

  if (validationErrors.length) {
    return res.render(VIEWS.NEW, { title: 'Create New Voting', validationErrors });
  }

  try {
    const votingInstance = new VotingService();
    await votingInstance.create(user._id, userInputs);
    return res.redirect(ROUTES.HOME);
  } catch (error) {
    next(error);
  }
};

exports.deleteVoting = async (req, res, next) => {
  const { user, votingInstance } = req;

  try {
    const voting = await votingInstance.get();

    if (!voting.isCreatedBy(user._id)) return next(createError(403));

    const { deletedVoting, createdBy } = await votingInstance.delete(user._id);

    return res.json({ displayName: createdBy.displayName, topic: deletedVoting.topic });
  } catch (error) {
    next(error);
  }
};

exports.getVoting = async (req, res, next) => {
  const { user, votingInstance } = req;

  try {
    const voting = await votingInstance.get();
    const { options } = voting;

    const hasAdminPermission = voting.isCreatedBy(user && user._id);
    const hasParticipated = voting.isParticipated(user && user._id);

    await voting.execPopulate('createdBy');

    return res.render(VIEWS.VOTING, {
      title: 'Voting Detail',
      voting,
      options: voting.isOngoing ? options : getSortedOptions(options),
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
    votingInstance,
    body: { selectedOptionId },
  } = req;

  try {
    const { voting, selectedOption } = await votingInstance.vote(
      user._id,
      selectedOptionId
    );

    return res.status(200).json({
      topic: voting.topic,
      selectedOption: selectedOption.content,
    });
  } catch (error) {
    next(error);
  }
};
