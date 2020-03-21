const express = require('express');
const moment = require('moment-timezone');
const router = express.Router();

const User = require('../models/User');
const Vote = require('../models/Vote');

const { calculateRemainTime } = require('../utils/index');
const { findVoteById } = require('../middlewares/votes');
const { isAuthenticated, findLoggedInUser } = require('../middlewares/authorization');

router.get('/new', isAuthenticated, (req, res) => {
  res.render('new', {
    title: 'vote!',
    defaultDate: moment().tz('Asia/Seoul').format().slice(0, 16),
    alertMessage: req.flash('alert'),
    isLogined: req.isAuthenticated()
  });
});

router.post('/new', isAuthenticated, findLoggedInUser, async (req, res, next) => {
  const { user } = res.locals;
  
  try {
    if (!req.body.title.length) {
      req.flash('alert', '투표 제목을 작성해주세요');
      return res.redirect('/votings/new');
    }
    
    if (req.body.selections.includes('')) {
      req.flash('alert', '투표 선택지가 비어있습니다');
      return res.redirect('/votings/new');
    }
    
    const vote = await Vote.create({
      ...req.body,
      owner: {
        _id: user._id,
        name: user.name
      },
      selections: req.body.selections.map(selection => {
        return { content: selection }
      }),
      in_progress: true
    });

    await User.findByIdAndUpdate(req.session.passport.user, {
      $push: {
        votes: vote._id
      }
    });

    res.redirect('/votings/success');
  } catch (error) {
    next({
      status: 500,
      message: '투표 만들기에 실패했습니다'
    });
  }
});

router.get('/success', isAuthenticated, (req, res) => {
  res.render('success', {
    title: 'vote!',
    isLogined: req.isAuthenticated(),
    message: '투표가 성공적으로 만들어졌습니다'
  })
});

router.get('/error', isAuthenticated, (error, req, res) => {
  res.render('error', {
    title: 'vote!',
    error
  })
});

router.get('/:id', findLoggedInUser, findVoteById, async (req, res) => {
  const { vote, user } = res.locals;

  const bestSelect = vote.selections.reduce((best, selection) => {
    return selection.selected > best.selected ? selection : best;
  });

  res.render('vote', {
    title: 'vote!',
    calculateRemainTime,
    isLogined: req.isAuthenticated(),
    bestSelect,
    vote,
    user
  })
});

router.put('/:id', isAuthenticated, async (req, res, next) => {
  try {
    await Vote.update({
      _id: req.params.id,
      "selections._id": req.body.selections
     }, {
      $inc: {
        "selections.$.selected": 1
      },
      $push: {
        voters: req.session.passport.user
      }
    });
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  }

  res.redirect('/');
});

router.delete('/:id', isAuthenticated, findVoteById, async (req, res, next) => {
  const { vote } = res.locals;

  try {
    await User.update({
      _id: vote.owner._id
    }, {
      $pull: {
        votes: req.params.id
      }
    });
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  }
  
  try {
    await Vote.findByIdAndDelete(req.params.id);
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  }
  
  res.redirect('/');
});

module.exports = router;
