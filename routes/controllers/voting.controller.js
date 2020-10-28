const Voting = require('../../models/Voting');
const User = require('../../models/User');
const { isExpiration } = require('../../utils');
const createError = require('http-errors');
const constants = require('../../constants');

exports.renderNewVotingMakerPage = (req, res, next) => {
  res.render('newVoting');
};

exports.renderMyVotingsPage = async (req, res, next) => {
  try {
    const { user: { _id } } = req;
    const { votings } = await User.findOne({ _id }).populate('votings');

    votings.map((voting) => voting.isExpiration = isExpiration(voting.expirationDate));

    res.render('myVotings', { votings });
  } catch (err) {
    next(err);
  }
};

exports.getVotingDetails = async (req, res, next) => {
  let userId;

  try {
    if (req.user) {
      userId = req.user._id;
    } else {
      userId = null;
    }
  } catch (err) {
    console.error(err.message);
  }

  try {
    const { id } = req.params;
    const voting = await Voting.findOne({ _id: id });
    const { options } = voting.populate('options');
    // const isCreator = voting.createdBy.toString() === userId.toString();

    voting.isExpiration = isExpiration(voting.expirationDate);

    res.render('votingDetails', { id, voting, options });
  } catch (err) {
    next(err);
  }
};

exports.vote = async (req, res, next) => {

  try {
    const { _id } = req.user;
    const { option } = req.body;
    // if (!_id, !option) return createError(400, constants.ERROR_MESSAGE_NOT_EXIST);

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

exports.success = async (req, res, next) => {
  res.render('success');
}

exports.deleteVoting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    if (!id) {
      next(createError(400, constants.ERROR_MESSAGE_NOT_EXIST));
    }

    await Voting.findByIdAndDelete(id);
    await User.findOne({ _id }).populate('votings').deleteOne({ id });

    res.json({ message: constants.SUCCESS_MESSAGE_DELETE });

  } catch (err) {
    next(err)
  }
};
