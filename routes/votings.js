const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Vote = require('../models/Vote');

const { isAuthenticated } = require('../middlewares/authorization');

router.get('/getCount', isAuthenticated, (req, res) => {
  res.render('getCount', {
    start: false
  });
});

router.post('/getCount', (req, res) => {
  req.session.count = req.body.selectionCount;
  res.redirect('/votings/new');
});

router.post

router.get('/new', isAuthenticated, (req, res) => {
  res.render('new', {
    start: true,
    count: req.session.count
  });
});

router.post('/new', async (req, res) => {
  try {
    const user = await User.findById(req.session.passport.user);
    const vote = new Vote({
      ...req.body,
      owner: req.session.passport.user,
      selections: req.body.selections.map(selection => {
        return { content: selection }
      }),
      in_progress: true
    });
    await vote.save();
    user.votes.push(vote._id);
    await user.save();
    res.redirect('/votings/success');
  } catch (error) {
    res.redirect('/votings/error');
  }
});

router.get('/success', (req, res) => {
  res.render('success', {
    message: '투표가 성공적으로 만들어졌습니다'
  })
});

router.get('/error', (req, res) => {
  res.render('error', {
    message: '투표 만들기에 실패했습니다'
  })
});

router.get('/:id', async (req, res) => {
  const vote = await Vote.findById(req.params.id);
  res.render('vote', {
    vote
  })
});

router.post('/:id', async (req, res) => {
  const vote = await Vote.findById(req.params.id);
  const selection = vote.selections.id(req.body.selections);
  selection.selected += 1;
  await vote.save();
  res.redirect('/');
});

module.exports = router;
