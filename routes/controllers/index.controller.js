const mongoose = require('mongoose');
const createError = require('http-errors');
const constants = require('../../constants');
const { VotingService, UserService } = require('../../service/service');


exports.getAllVotings = async (req, res, next) => {
  try {
    const votings = await new VotingService().findAllVotings();

    res.render('index', { votings });
  } catch (err) {
    next(err);
  }
};

exports.createVoting = async (req, res, next) => {
  try {
    const { _id, name } = req.user;
    const { votingTitle, expirationDate, options } = req.body;
    const isValidObjectId = mongoose.isValidObjectId(_id);

    if (!isValidObjectId) {
      return next(createError(400, constants.ERROR_MESSAGE_REQUEST_FAIL));
    }

    const saveVoting = await new VotingService().createVoting( _id, name, votingTitle, expirationDate, options );

    await new UserService().updateUserVoting(_id, saveVoting._id);

    res.redirect('/');
  } catch (err) {
    next(err);
  }
};
