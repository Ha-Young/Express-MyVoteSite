const Voting = require('../../models/Voting');
const User = require('../../models/User');
const { isExpiration } = require('../../utils');
const createError = require('http-errors');
const constants = require('../../constants');

exports.getRenderNewVoting = (req, res, next) => {
  res.render('newVoting');
};

exports.renderMyVotingsPage = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { votings } = await User.findOne({ _id }).populate('votings');

    votings.map(
      voting =>
        voting.isExpiration = isExpiration(voting.expirationDate)
    );

    res.render('myVotings', { votings });
  } catch (err) {
    next(err);
  }
};

exports.getRenderVotingDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const voting = await Voting.findOne({ _id: id });
    const { options } = voting.populate('options');

    if (!voting || !options) {
      return next(createError(400, constants.ERROR_MESSAGE_REQUEST_FAIL));
    }

    let isCreator;
    let userId;

    if (req.user) {
      userId = req.user._id;
      isCreator = voting.createdBy.toString() === userId.toString();
    } else {
      userId = null;
    }
    voting.isExpiration = isExpiration(voting.expirationDate);

    res.render('votingDetails', { id, voting, isCreator, options });
  } catch (err) {
    next(err);
  }
};

exports.vote = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { option } = req.body;

    if (!_id, !option) {
      return createError(400, constants.ERROR_MESSAGE_NOT_EXIST);
    }

    await Voting.updateOne(
      { 'options._id': option },
      { $addToSet: { 'options.$[option].voters': _id } },
      { arrayFilters: [{ 'option._id': option }] }
    );

    res.json({ message: constants.SUCCESS_MESSAGE_VOTING });
  } catch (err) {
    next(err);
  }
};

exports.deleteVoting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    if (!id) {
      next(createError(400, constants.ERROR_MESSAGE_NOT_EXIST));
    }

    await Voting.findByIdAndDelete(id);
    // await User.updateOne(
    //   { '_id': _id },
    //   { $pull: { 'votings': id } }
    // );
    res.json({ message: constants.SUCCESS_MESSAGE_DELETE });
  } catch (err) {
    next(err)
  }
};
