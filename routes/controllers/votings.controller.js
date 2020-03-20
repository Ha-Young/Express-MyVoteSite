
const createError = require('http-errors');
const mongoose = require('mongoose');
const saveDataForNewVote = require('../../lib/saveDataForNewVote');
const getDataForPollResults = require('../../lib/getDataForPollResults');
const validateNewVoteInput = require('../../lib/validateNewVoteInput');
const User = require('../../models/user');
const Poll = require('../../models/poll');

exports.renderNewVoing = (req, res, next) => {
  res.render('newvoting', { hasLoggedIn: true });
};

exports.newVotePostHandler = async(req, res, next) => {
  try {
    const time = `${req.body.date} ${req.body.time}`;
    if (new Date() > new Date(time)) {
      return res.redirect('/votings/failure');
    }

    validateNewVoteInput(req.body);
    await saveDataForNewVote(req, time);
    res.redirect('/votings/success');
  } catch(e) {
    if (e.name === "MongoError") {
      return next(createError(500, "Internal Error, your vote was not saved please try again"));
    }

    next(e);
  }
};

exports.renderSuccess = (req, res, next) => {
  res.render('success', { hasLoggedIn: true });
};

exports.renderFailure = (req, res, next) => {
  res.render('failure', { hasLoggedIn: true });
};

exports.renderIndividualPoll = async(req, res, next) => {
  try {
    const id = req.params.poll_id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw(createError(404, "You are trying to access unrecognized path"));
    }
    
    const poll = await Poll.findById(id).populate('creator');
    if (new Date() > new Date(poll.expiringTime)) {
      throw(createError(403, "This vote has been closed"));
    }

    let isCreator = false;
    let data = null;
    if (req.isAuthenticated()) {
      const { user } = req.session.passport;
      if (poll.creator.id === user) isCreator = true;
      data = getDataForPollResults(isCreator, poll);
      data.hasLoggedIn = true;
      return res.render('poll', data);
    }

    data = getDataForPollResults(isCreator, poll);
    data.hasLoggedIn = false;
    return res.render('poll', data);
  } catch(e) {
    if (e.name === "MongoError") {
      return next(createError(500, "Internal Error, your vote was not saved please try again"));
    }

    next(e);
  }
};

exports.saveVotingResults = async(req, res, next) => {
  try {
    const { poll } = res.locals;
     if (new Date() > new Date(poll.expiringTime)) {
      throw(createError(403, "This vote has been closed"));
    }

    const { user }  = req.session.passport;
    const { answer } = req.body;  
    poll.answers.forEach((option) => {
      if (option.answer === answer) option.votes += 1;
    });
  
    poll.finishedUsers.push(user);
    await poll.save();
    res.redirect('/');
  } catch(e) {
    if (e.name === "MongoError") {
      return next(createError(500, "Internal Error, your vote was not saved please try again"));
    } 

    next(e);
  }
};

exports.deleteApoll= async(req, res, next) => {
  try {
    const { pollId } = req.body;
    const poll = await Poll.findById(pollId).populate('creator');
    const userId = poll.creator.id;
    const user = await User.findById(userId);
    let index = '';
    user.myPolls.some((poll, i) => {
      if (String(poll.myPoll) === String(pollId)) {
        return index = i;
      }
    });
  
    user.myPolls.splice(index, 1);
    await user.save();
    await Poll.findOneAndDelete(pollId);
    return res.status(200).json({ result: 'ok' });
  } catch(e) {
    if (e.name === "MongoError") {
      return next(createError(500, "Internal Error, vote was not deleted."));
    }

    next(e);
  }
};
