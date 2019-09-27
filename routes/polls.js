const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { ensureAuthenticated } = require('../config/authentication');
const Poll = require('../models/Poll');
const User = require('../models/User');

const {
  formatDateTimeString,
  isOwner,
  isOpenPoll,
  formatDateTimeDisplay,
} = require('../helpers');

router.get('/', ensureAuthenticated, async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    try {
      throw new Error('User Not Found');
    } catch (error) {
      error.status = 404;
      return next(error);
    }
  }
  try {
    const myPollDocs = await Poll.find({ authorid: req.user._id });
    myPollDocs.forEach(pollDoc => {
      pollDoc.isOpen = isOpenPoll(pollDoc.expirydate);
      pollDoc.expirydate = formatDateTimeDisplay(pollDoc.expirydate);
    });
    res.status(200).render('mypolls', {
      name: req.user.name,
      myPollsList: myPollDocs,
    });
  } catch (error) {
    error.status = 404;
    error.message =
      'Error: Could not find user data while loading my polls page.';
    next(error);
  }
});

router.get('/success', ensureAuthenticated, (req, res, next) => {
  res.status(200).render('success');
});

router.get('/failure', ensureAuthenticated, (req, res, next) => {
  res.status(200).render('failure');
});

router.get('/new', ensureAuthenticated, (req, res, next) => {
  res.status(200).render('newpoll');
});

router.post('/new', ensureAuthenticated, async (req, res, next) => {
  let { pollTitle, expireDate, expireTime, optionElements } = req.body;

  const pollValidated =
    pollTitle !== undefined &&
    expireDate !== undefined &&
    expireTime !== undefined &&
    optionElements !== undefined

  if (pollValidated) {
    try {
      const expiryDateTime = formatDateTimeString(expireDate, expireTime);
      if (expiryDateTime)
      optionElements = optionElements.map(value => {
        return { name: value };
      });
      const poll = new Poll({
        title: pollTitle,
        authorname: req.user.name,
        authorid: req.user._id,
        expirydate: expiryDateTime,
        options: optionElements,
      });
      await poll.save();
      req.flash(
        'success_msg',
        'You have successfully created a new poll! check it out at home page.'
      );
      res.status(200).redirect('/polls/success');
    } catch (error) {
      error.status = 500;
      next(error);
    }
  } else {
    try {
      throw new Error('Failed attempt at creating a new poll.');
    } catch (error) {
      error.status = 400;
      console.error(error);
      req.flash('error_msg', 'Failed attempt at creating a new poll.');
      res.status(400).redirect('/polls/failure');
    }
  }
});

router.get('/:poll_id', ensureAuthenticated, async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.poll_id)) {
    try {
      throw new Error('Poll Not Found');
    } catch (error) {
      error.status = 404;
      return next(error);
    }
  }
  try {
    const promisePollDoc = Poll.findById(req.params.poll_id);
    const promiseUser = User.findById(req.user._id);
    const [user, pollDoc] = await Promise.all([promiseUser, promisePollDoc]);

    pollDoc.isOpen = isOpenPoll(pollDoc.expirydate);
    pollDoc.expirydate = formatDateTimeDisplay(pollDoc.expirydate);

    res.status(200).render('poll', {
      pollDoc: pollDoc,
      isOwner: isOwner(req.user._id, pollDoc.authorid),
      hasVoted: user.votedpolls.indexOf(`${pollDoc._id}`),
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.post('/:poll_id', ensureAuthenticated, async (req, res, next) => {
  try {
    const reqOptionID = req.body.optionID;
    const promisePollDoc = Poll.findOne({ 'options._id': reqOptionID });
    const promiseUser = User.findById(req.user._id);
    const [user, pollDoc] = await Promise.all([promiseUser, promisePollDoc]);
    const hasVoted = user.votedpolls.indexOf(`${pollDoc._id}`);
    const isPollOpen = isOpenPoll(pollDoc.expirydate);

    if (!isPollOpen) {
      req.flash('error_msg', 'This poll has expired. Your vote has not been submitted');
      return res.status(400).redirect('/polls/failure');
    }

    if (hasVoted < 0) {
      const votedOption = pollDoc.options.find(dbOption => {
        return `${dbOption._id}` === reqOptionID;
      });

      votedOption.count = votedOption.count + 1;
      pollDoc.options[pollDoc.options.indexOf(votedOption)] = votedOption;
      user.votedpolls.push(pollDoc._id);

      await Promise.all([user.save(), pollDoc.save()]);
      res.status(200).redirect(req.params.poll_id);
    }
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.delete('/:poll_id', ensureAuthenticated, async (req, res, next) => {
  try {
    const deletedPoll = await Poll.findByIdAndDelete(req.params.poll_id)
    if (deletedPoll) {
      return res.status(200).end();
    }
  }
  catch (error) {
    error.status = 500;
    error.message = 'Error occurred during poll deletion';
    next(error);
  }
});

module.exports = router;
