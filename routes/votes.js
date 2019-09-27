const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');
const { validateVote } = require('./middleware/validation');
const { convertDate } = require('../utils/utils');
const { isAuthenticated, isAuthenticatedAjax } = require('../routes/middleware/authentication');

router.get('/', isAuthenticated, (req, res, next) => {
  try {
    Vote.find({
      user_id: req.user._id,
    })
    .populate('user_id', 'name')
    .exec((err, votes) => {
      if (err) {
        console.error(err);
        return next(err);
      }

      const voteCollection = votes.map(vote => {
        vote.converted_date = convertDate(vote.expired_at);
        return vote;
      });

      return res.render('index', {
        userName: req.user.name,
        votes: voteCollection,
        message: null
      });
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/new', isAuthenticated, async (req, res, next) => {
  res.render('votings_new', {
    userName: req.user.name,
    message: req.flash('validationError')[0] || null
  });
});

router.get('/success', isAuthenticated, async (req, res, next) => {
  res.render('success', {
    userName: ''
  });
});

router.get('/error', isAuthenticated, async (req, res, next) => {
  res.render('error', {
    userName: '',
    message:  'Internal Server Error',
    errorStatus: 500
  });
});

router.post('/new', isAuthenticated, validateVote, async (req, res, next) => {
  try {
    const options = req.body.options.map((option) => {
      return {
        title: option.toString(),
        voted_user: []
      };
    });

    const newVote = new Vote({
      user_id: req.user._id,
      ...req.body,
      expired_at: res.locals.isoDate,
      options
    });

    const error = newVote.validateSync();

    if (error && error.name === 'ValidationError') {
      const errorObj = error.errors.title || error.errors.expired_at;
      const errorMessage = errorObj ? errorObj.message : '투표 생성에 실패하였습니다.';

      req.flash('validationError', errorMessage);
      return res.redirect('/votings/new');
    }

    await newVote.save();

    res.redirect('/votings/success');
  } catch (err) {
    console.error(err);

    res.redirect('/votings/error');
  }
});

router.put('/vote', isAuthenticatedAjax, async (req, res, next) => {
  try {
    const { voteId, optionId } = req.body;
    const { _id: userId } = req.user;

    const targetVote = await Vote.findById(voteId);

    if (!targetVote) {
      return res.json({ fail: '이미 삭제된 투표입니다.' });
    }

    const isExpired = new Date() - new Date(targetVote.expired_at) > 0;

    if (isExpired) {
      return res.json({ fail: 'Expired!' });
    }

    const isDuplicateVote = targetVote.options.find(option => option.voted_user.indexOf(userId) > -1);

    if (isDuplicateVote) {
      return res.json({ fail: 'Already voted!' });
    }

    const targetIndex = targetVote.options.findIndex(option => option._id.toString() === optionId);
    targetVote.options[targetIndex].voted_user.push(userId);

    await targetVote.save();

    return res.json({ success: 'Voted Successfully!' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:voteId', isAuthenticated, (req, res, next) => {
  try {
    const { voteId } = req.params;
    const { _id: userId } = req.user;

    if (!userId) {
      return next(err);
    }

    Vote.findById(voteId)
    .populate('user_id', 'name')
    .exec((err, vote) => {
      if (err) {
        console.error(err);
        err.status = 404;
        return next(err);
      }

      let isAuthorizedUser = false;

      if (userId.toString() === vote.user_id._id.toString()) {
        isAuthorizedUser = true;
      }

      const allVoteCount = vote.options.reduce((ac, cv) => ac += cv.voted_user.length, 0);
      vote.converted_date = convertDate(vote.expired_at);

      const sortedOptions = vote.options.slice().sort((l, r) => r.voted_user.length - l.voted_user.length);

      return res.render('votings_detail', {
        userName: req.user.name,
        vote,
        sortedOptions,
        isAuthorizedUser,
        allVoteCount
      });
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:voteId', isAuthenticatedAjax, async (req, res, next) => {
  try {
    await Vote.findByIdAndDelete(req.params.voteId);

    res.json({ success: 'Deleted Successfully!' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
