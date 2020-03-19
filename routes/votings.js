const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Vote = require('../models/Vote');

const { isAuthenticated } = require('../middlewares/authorization');
const { calculateRemainTime } = require('../middlewares/utils');

router.get('/getCount', isAuthenticated, (req, res) => {
  res.render('getCount', {
    title: 'vote!',
    isLogined: req.isAuthenticated()
  });
});

router.post('/getCount', (req, res) => {
  req.session.count = req.body.selectionCount;
  res.redirect('/votings/new');
});

router.get('/new', isAuthenticated, (req, res) => {
  const today = new Date();
  const defaultDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
  res.render('new', {
    title: 'vote!',
    isLogined: req.isAuthenticated(),
    count: req.session.count,
    defaultDate
  });
});

router.post('/new', isAuthenticated, async (req, res) => {
  try {
    const owner = await User.findById(req.session.passport.user);
    const vote = await Vote.create({
      ...req.body,
      owner: {
        _id: owner._id,
        name: owner.name
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
    res.redirect('/votings/error');
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
    isLogined: req.isAuthenticated(),
    message: '투표 만들기에 실패했습니다',
    error
  })
});

router.get('/:id', async (req, res) => {
  const vote = await Vote.findById(req.params.id);
  const user = await User.findById(req.session.passport.user);
  const bestSelect = vote.selections.reduce((most, cur) => {
    if (cur.selected > most.selected) {
      return cur;
    } else {
      return most;
    }
  }, vote.selections[0]);
  res.render('vote', {
    title: 'vote!',
    calculateRemainTime,
    isLogined: req.isAuthenticated(),
    bestSelect,
    vote,
    user
  })
});

router.post('/:id', isAuthenticated, async (req, res) => {
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
  res.redirect('/');
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  const vote = await Vote.findById(req.params.id);
  await User.update({
    _id: vote.owner._id
  }, {
    $pull: {
      votes: req.params.id
    }
  });
  await Vote.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
