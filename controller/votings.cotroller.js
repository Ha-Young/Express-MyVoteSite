const { validationResult } = require('express-validator');
const createError = require('http-errors');
const Voting = require('../models/Voting');
const timeUtil = require('../lib/timeUtil');
const util = require('../lib/util');

exports.getCreatePage = (req, res, next) => {
  const user = req.user.email.split('@')[0];
  res.render('create', { user });
}

exports.createNewVote = async (req, res, next) => {
  try {
    const errors = validationResult(req).errors;
    if (errors.length) return res.status(400).render('validationFail', { message: errors[0].msg });

    const createdExpiration = timeUtil.makeUTCtime(req.body.expiration_date, req.body.expiration_time);
    const isSaved = await util.createVoting(req.body.title, req.user._id, createdExpiration, req.body.options);

    if (!isSaved) return next(createError(404, 'We can not saved your vote for unknown reasons. Try again.'));
    return res.status(201).render('postResult', { message: 'Saved your vote! :)'});
  } catch (err) {
    const errMessage = err.message.toString().split(' ');
    if (errMessage[9] === '"$",') {
      const message = 'Sorry. "$" characters cannot be included in option content. Please delete "$" in option content.';
      return res.stats(400).render('validationFail', { message });
    } else if (errMessage[8] === '".",') {
      const message = 'Sorry. "." characters cannot be included in option content. Please delete "." in option content.';
      return res.stats(400).render('validationFail', { message });
    } else {
      next(createError(404, 'An unknown error occurred while saving vote. Try again!'));
    }
  }
}

exports.getSelectedVote = async (req, res, next) => {
  try {
    const selectedVote = await Voting.findById(req.params.id).populate('made');
    if (!selectedVote) return next(createError(404, 'We can not find the selected vote for unknown reasons. Try again.'));

    const options = util.getOptions(selectedVote);
    const voteInfo = {
      id: selectedVote._id.toString(),
      title: selectedVote.title,
      expirationDate: selectedVote.expiration_date.toString(),
      madeByName: selectedVote.made.email.split('@')[0],
      madeById: selectedVote.made._id.toString(),
      options: options[0],
      allCount: options[1],
    };
    if (!req.user) return res.render('votingDetail', { voteInfo });
    voteInfo.loginUser = req.user._id.toString();
    const user = req.user.email.split('@')[0];
    res.render('votingDetail', { user, voteInfo });
  } catch (err) {
    next(err);
  }
}

exports.voteSelectedVoting = async (req, res, next) => {
  try {
    const selectedVote = await Voting.findById(req.params.id);
    if (!selectedVote) return next(createError(404, 'We can not find the selected vote for unknown reasons. Try again.'));

    const { voted } = selectedVote;
    const isIncludUser = voted.some((vote) => req.user._id.equals(vote));
    if (isIncludUser) return res.status(401).render('validationFail', { message: 'You can only vote once! :)' });

    const save = await util.updateVoting(selectedVote, req.body.option, req.user._id);
    if (save !== selectedVote) return next(createError(404, 'We can not saved the selected vote for unknown reasons. Try again.'));
    return res.status(201).render('postResult', { message: 'Saved your choice! Thanks :)'});
  } catch (err) {
    if (err.message.toString() === 'Mongoose maps only support string keys, got undefined') {
      const message = 'Sorry. You did not choose. Choose and vote.';
      return res.status(400).render('validationFail', { message });
    }
    next(err);
  }
}

exports.deleteVote = async (req, res, next) => {
  try {
    const selectedVote = await Voting.findById(req.params.id);
    if (!selectedVote) return next(createError(404, 'We can not find the selected vote for unknown reasons. Try again.'));
    const deletedVote = await Voting.deleteOne({ _id: req.params.id });
    if (deletedVote.ok !== 1) return next(createError(404, 'We can not delete the selected vote for unknown reasons. Try again.'));
    res.json({ "delete": "ok" });
  } catch (err) {
    next(err);
  }
}
