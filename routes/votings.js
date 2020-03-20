const express = require('express'),
      router = express.Router(),
      Vote = require('../models/Vote'),
      _ = require('lodash'),
      { authenticateUser } = require('./middlewares/authorization');

router.get('/new', authenticateUser, function(req, res, next) {
  res.render('votingsNew');
});

router.get('/success', authenticateUser, function(req, res, next) {
  res.render('votingsSuccess');
});

router.get('/fail', authenticateUser, function(req, res, next) {
  res.render('votingsFail');
});

router.get('/:id', async (req, res, next) => {
  try {
    const vote = await Vote.findOne({ id: req.params.id });
    let currentUser;
    if (!req.user) {
      res.render('votingsDetail', { vote: vote, currentUser: null });
    } else {
      res.render('votingsDetail', { vote: vote, currentUser: req.user.id });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/new', authenticateUser, async (req, res, next) => {
  try {
    if (!req.user) {
      res.redirect('/login')
    } else {
      req.body.creator = req.user.id;
      req.body.voteOptions = req.body.voteOptions.map(x => ({ voteOption: x, voteResult: 0}));
      const inputTime = new Date(req.body.dueDate);
      const now = new Date();
      if (inputTime > now) {
        req.body.isFinish = '진행중';
      } else {
        req.body.isFinish = '종료';
      }
      await Vote.create(req.body);
      res.status(201).redirect('/votings/success');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/:id', authenticateUser, async (req, res, next) => {
  try {
    const vote = await Vote.findOne({ id: req.params.id });
    const voteOptionSelector = _.find(vote.voteOptions, { voteOption: req.body.voteOption });
    if (vote.voteUser.indexOf(req.user.id) === -1) {
      voteOptionSelector.voteResult += 1;
      vote.voteUser.push(req.user.id);
      await vote.save();
      res.status(201).redirect('/votings/'+req.params.id);
    } else {
      res.redirect('/votings/'+req.params.id);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateUser, async (req, res, next) => {
  try {
    const vote = await Vote.findOne({ id: req.params.id });
    vote.isFinish = '사용자에 의해 종료된 투표입니다.';
    await vote.save();
    res.status(201).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
