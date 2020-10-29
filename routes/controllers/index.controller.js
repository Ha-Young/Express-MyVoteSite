const mongoose = require('mongoose');
const createError = require('http-errors');
const Voting = require('../../models/Voting');
const User = require('../../models/User');
const { isExpiration } = require('../../utils');
const constants = require('../../constants');

exports.getAllVotings = async (req, res, next) => {
  try {
    const votings = await Voting.find();
    votings.map(voting => voting.isExpiration = isExpiration(voting.expirationDate));

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
    const optionObject = options.map(option => { return { option } });
    const voting = {
      createdBy: _id,
      userName: name,
      votingTitle,
      expirationDate,
      options: optionObject,
    };
    const saveVoting = await Voting(voting).save();
    const userObj = await User.findOne({ _id });

    if(!isValidObjectId || !userObj) {
      return next(createError(400, constants.ERROR_MESSAGE_REQUEST_FAIL))
    }

    userObj.votings.push(saveVoting._id);
    await User(userObj).save();

    res.redirect('/');
  } catch (err) {
    next(err);
  }
};
