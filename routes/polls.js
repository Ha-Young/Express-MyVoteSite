const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');

const { ensureAuthenticated } = require('../config/authentication');
const Poll = require('../models/Poll');
const User = require('../models/User');

const {
  parseStringToDate,
  isOwner,
  isOpenPoll,
  formatTime,
} = require('../helpers');

router.get('/', ensureAuthenticated, (req, res, next) => {
  Poll.find({ authorid: req.user._id })
    .then(myPollDocs => {
      myPollDocs.forEach(pollDoc => {
        pollDoc.isOpen = isOpenPoll(pollDoc.expirydate);
        pollDoc.expirydate = formatTime(pollDoc.expirydate);
      });

      res.status(200).render('mypolls', {
        name: req.user.name,
        myPollsList: myPollDocs,
      });
    })
    .catch(error => {
      error.status = 500;
      error.message = 'Error occurred while retrieving my polls';
      next(error);
    });
});

router.get('/newpollerror', ensureAuthenticated, (req, res, next) => {
  res.status(200).render('newpollerror');
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

  const isValidated =
    pollTitle !== undefined &&
    expireDate !== undefined &&
    expireTime !== undefined &&
    optionElements !== undefined;

  if (isValidated) {
    const expiryDateTime = parseStringToDate(expireDate, expireTime);

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

    try {
      await poll.save();
    } catch (error) {
      if (error) {
        req.flash('error_msg', 'Failed at creating a new poll.');
        return res.status(500).redirect('/polls/failure');
      }
    }
    req.flash(
      'success_msg',
      'You have successfully created a new poll! check it out at home page.'
    );
    return res.status(201).redirect('/polls/success');
  }

  try {
    throw new Error('Validation failed while creating a new poll.');
  } catch (error) {
    error.status(400);
    next(error);
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

  const pollDoc = await Poll.findById(req.params.poll_id).catch(error => {
    error.status = 500;
    next(error);
  });

  const user = await User.findById(req.user._id).catch(error => {
    error.status = 500;
    next(error);
  });

  pollDoc.isOpen = isOpenPoll(pollDoc.expirydate);
  pollDoc.expirydate = formatTime(pollDoc.expirydate);

  res.status(200).render('poll', {
    pollDoc: pollDoc,
    isOwner: isOwner(req.user._id, pollDoc.authorid),
    hasVoted: user.votedpolls.indexOf(`${pollDoc._id}`),
  });
});

router.post('/:poll_id', ensureAuthenticated, async (req, res, next) => {
  const reqOptionID = req.body.optionID;

  const poll = await Poll.findOne({ 'options._id': reqOptionID }).catch(
    error => {
      error.status = 500;
      error.message = 'Error occurred while finding poll';
      next(error);
    }
  );

  const user = await User.findById(req.user._id).catch(error => {
    error.status = 500;
    next(error);
  });

  const hasVoted = user.votedpolls.indexOf(`${poll._id}`);

  if (hasVoted < 0) {
    // TODO: mongoose find and update ... add to set?
    const foundOption = poll.options.find(dbOption => {
      return `${dbOption._id}` === reqOptionID;
    });

    foundOption.count = foundOption.count + 1;

    poll.options[poll.options.indexOf(foundOption)] = foundOption;

    user.votedpolls.push(poll._id);

    await poll.save().catch(error => {
      error.status = 500;
      error.message = 'Error occurred while updating poll data';
      next(error);
    });

    await user.save().catch(error => {
      error.status = 500;
      error.message = 'Error occurred while updating user data';
      next(error);
    });

    res.redirect(req.params.poll_id);
  }
});

router.delete('/:poll_id', ensureAuthenticated, async (req, res, next) => {
  const deletedPoll = await Poll.findByIdAndDelete(req.params.poll_id).catch(
    error => {
      error.status = 500;
      error.message = 'Error occurred during poll deletion';
      next(error);
    }
  );

  if (deletedPoll) {
    return res.status(200).end();
  }
});

module.exports = router;
