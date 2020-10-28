const Voting = require('../models/Voting');

const VIEWS = require('../constants/views');
const { convertToVotingObject } = require('../util/voting');

exports.getAll = async (req, res, next) => {
  try {
    const votings = await Voting.find().populate('author');
    return res.render(VIEWS.INDEX, { title: 'MAIN', votings });
  } catch (err) {
    next(err);
  }
};

exports.getAllMyVotings = (req, res, next) => {
  res.render(VIEWS.INDEX, { title: 'getAllMyVotings' });
};

exports.getNewVoting = (req, res, next) => {
  res.render(VIEWS.NEW, { title: 'Create New Voting' });
};

exports.postNewVoting = async (req, res, next) => {
  const {
    user: { _id },
    body: userInputs,
  } = req;

  try {
    const newVoting = convertToVotingObject(_id, userInputs);
    await Voting.create(newVoting);

    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

exports.getVoting = async (req, res, next) => {
  const { user, voting } = req;

  try {
    const hasAdminPermission = voting.isMine(user._id);
    const hasParticipated = voting.isParticipated(user._id);
    await voting.execPopulate('author');

    res.render(VIEWS.VOTING, {
      title: 'Voting Detail',
      voting,
      hasAdminPermission,
      hasParticipated,
    });
  } catch (error) {
    next(error);
  }
};

exports.postVoting = (req, res, next) => {};

exports.postVotingSuccess = (req, res, next) => {};

exports.postVotingError = (req, res, next) => {};
