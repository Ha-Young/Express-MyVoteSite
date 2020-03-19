const { validationResult } = require('express-validator');
const Voting = require('../models/Voting');


exports.getCreatePage = (req, res, next) => {
  const user = req.user.email.split('@')[0];
  res.render('create', { user });
}

exports.createNewVote = async (req, res, next) => {
  try {
    const errors = validationResult(req).errors;
    if (!errors.length) {
      const mergedDateTime = req.body.expiration_date + ' ' + req.body.expiration_time;
      const createdExpiration = new Date(mergedDateTime);
    
      const newVoting = new Voting({
        title: req.body.title,
        made: req.user._id,
        expiration_date: createdExpiration,
        description: req.description,
        options: {},
        voted: [],
      });
    
      req.body.options.forEach((option) => {
        newVoting.options.set(option, 0);
      });
      await newVoting.save();
      return res.render('postResult', { message: 'Saved your vote! :)'});
    } else {
      return res.render('validationFail', { message: errors[0].msg });
    }
  } catch (err) {
    const errMessage = err.message.toString().split(' ');
    if (errMessage[9] === '"$",') {
      const message = 'Sorry. "$" characters cannot be included in option content. Please delete "$" in option content.';
      return res.render('validationFail', { message });
    } else if (errMessage[8] === '".",') {
      const message = 'Sorry. "." characters cannot be included in option content. Please delete "." in option content.';
      return res.render('validationFail', { message });
    } else {
      next(createError(404, 'An unknown error occurred while saving vote. Try again!'));
    }
  }
}

exports.getSelectedVote = async (req, res, next) => {
  try {
    const selectedVote = await Voting.findById(req.params.id).populate('made');
    if (!selectedVote) return next(createError(404, 'We can not find the selected vote for unknown reasons. Try again.'));
    const expirationDate = selectedVote.expiration_date.toString();
    const options = [];
    let allCount = 0;
    selectedVote.options.forEach((count) => allCount = allCount + count);
    selectedVote.options.forEach((count, option) => {
      const percent = (count / allCount * 100).toFixed(1) + '%';
      percent !== 'NaN%' ? options.push([option, count, percent]) : options.push([option, count, '0%']);
    });
    options.sort((a, b) => b[1] - a[1]);
    const voteInfo = {
      id: selectedVote._id,
      title: selectedVote.title,
      expiration: expirationDate.split('GMT')[0].slice(0, -4),
      made: selectedVote.made.email.split('@')[0],
      options,
      allCount,
    };

    const isOngoing = new Date() < new Date(expirationDate);
    isOngoing ? voteInfo.isOngoing = true : voteInfo.isOngoing = false;

    if (!req.user) return res.render('votingDetail', { voteInfo });

    const isCreatedLoginUser = req.user._id.equals(selectedVote.made._id);
    isCreatedLoginUser 
      ? voteInfo.isCreatedLoginUser = true 
      : voteInfo.isCreatedLoginUser = false;

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
    if (isIncludUser) return res.render('validationFail', { message: 'You can only vote once! :)' });

    const selectedOption = req.body.option;
    const newCount = selectedVote.options.get(selectedOption) + 1;
    selectedVote.options.set(selectedOption, newCount);
    selectedVote.voted.push(req.user._id);
    const save = await selectedVote.save();
    if (save !== selectedVote) return next(createError(404, 'We can not saved the selected vote for unknown reasons. Try again.'));
    return res.render('postResult', { message: 'Saved your choice! Thanks :)'});
  } catch (err) {
    next(err);
  }
}

exports.deleteVote = async (req, res, next) => {
  try {
    const selectedVote = await Voting.findById(req.params.id);
    if (!selectedVote) return next(createError(404, 'We can not find the selected vote for unknown reasons. Try again.'));
    const deletedVote = await Voting.deleteOne({ _id: req.params.id });
    if (deletedVote.ok !== 1) return next(createError(404, 'We can not delete the selected vote for unknown reasons. Try again.'));
    res.json({ "delete": "ok"});
  } catch (err) {
    next(err);
  }
}
