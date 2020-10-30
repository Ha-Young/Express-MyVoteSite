const mongoose = require('mongoose');
const createError = require('http-errors');
const constants = require('../../constants');
const { UserService, VotingService } = require('../../service/service');

exports.getRenderNewVoting = (req, res, next) => {
  res.render('newVoting');
};

exports.renderMyVotingsPage = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const isValidObjectId = mongoose.isValidObjectId(_id);

    if (!isValidObjectId) {
      return next(createError(400, constants.ERROR_MESSAGE_REQUEST_FAIL));
    }

    const votings = await new UserService().getUserVotings(_id);

    res.render('myVotings', { votings });
  } catch (err) {
    next(err);
  }
};

exports.getRenderVotingDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isValidObjectId = mongoose.isValidObjectId(id);

    if (!isValidObjectId) {
      return next(createError(400, constants.ERROR_MESSAGE_REQUEST_FAIL));
    }

    const { voting, isCreator, options, isVoter } = await new VotingService().getVotinDetails(id, req.user);

    res.render('votingDetails', { id, voting, isCreator, options, isVoter });
  } catch (err) {
    next(err);
  }
};

exports.vote = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { option } = req.body;
    const isValidObjectId = mongoose.isValidObjectId(_id);

    if (!isValidObjectId, !option) {
      return createError(400, constants.ERROR_MESSAGE_REQUEST_FAIL);
    }

    const isUpdate = await new VotingService().updateVoter(_id, option);

    if (isUpdate) {
      res.json({ message: constants.SUCCESS_MESSAGE_VOTING });
    } else {
      res.json({ message: constants.ERROR_MESSAGE_REQUEST_FAIL });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteVoting = async (req, res, next) => {
  try {
    const { params: { id }, user: { _id } } = req;
    const isValidObjectId = mongoose.isValidObjectId(_id);

    if (!isValidObjectId) {
      next(createError(400, constants.ERROR_MESSAGE_REQUEST_FAIL));
    }

    await new VotingService().deleteVoting(id);
    const isDeleteUserVoting = await new UserService().deleteUserVotings(_id, id);

    if (isDeleteUserVoting) {
      res.json({ message: constants.SUCCESS_MESSAGE_DELETE });
    } else {
      res.json({ message: constants.ERROR_MESSAGE_DELETE_FAIL });
    }

  } catch (err) {
    next(err)
  }
};
