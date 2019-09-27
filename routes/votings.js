const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isLoggedIn, convertDate } = require('./middlewares');
const Vote = require('../models/Vote');
const User = require('../models/User');

router.get('/', isLoggedIn, async (req, res, next) => {
  res.status(301).redirect('/');
});

router.get('/new', isLoggedIn, (req, res, next) => {
  res.render('new');
});

router.post('/new', isLoggedIn, async (req, res, next) => {
  const options = [];

  req.body.options.forEach(item => {
    const option = {};

    option.text = item;
    option.voted_users = [];
    options.push(option);
  });

  try {
    await Vote.create({
      title: req.body.title,
      created_by: req.user._id,
      description: req.body.description,
      options,
      expired_at: req.body.expired,
    });

    return res.render('success', {
      message: `투표가 성공적으로 생성되었습니다.`
    });
  } catch (error) {
    return res.render('error', {
      message: `투표생성이 실패했습니다.`,
      error
    });
  }
});

router.get('/:id', isLoggedIn, async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next();
  }

  try {
    const nowDate = new Date();
    const vote = await Vote.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: vote.created_by });
    let isVoting = false;

    for (let i = 0; i < vote.options.length; i++) {
      isVoting = vote.options[i].voted_users.some(item => {
        return String(item) === String(req.user._id);
      });

      if (isVoting) break;
    }

    if (vote.expired_at - nowDate > 0) {
      vote.name = user.name;
      vote.status = '진행중';
      vote.expired = convertDate(vote.expired_at);

      if (isVoting) {
        res.render('success', {
          message: '이미 투표하셨습니다.'
        });
      } else {
        res.render('vote', {
          vote,
          id: req.params.id
        });
      }
    } else {
      res.status(301).redirect(`/votings/${req.params.id}/result`);
    }
  } catch (error) {
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err);
  }
});

router.post('/:id', isLoggedIn, async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next();
  }

  const voteId = req.params.id;
  const vote = await Vote.findOne({ _id: voteId });
  const selectedIndex = `options.${req.body.voteOptions}.voted_users`;
  const nowDate = new Date();

  if (vote.expired_at - nowDate > 0) {
    try {
      await Vote.findByIdAndUpdate(voteId, { $addToSet: { [selectedIndex]: req.user._id }});

      res.render('success', {
        message: '투표가 완료되었습니다.'
      });
    } catch (error) {
      const err = new Error('Internal Server Error');
      err.status = 500;
      next(err);
    }
  } else {
    res.render('success', {
      message: `투표가 만료되었습니다.`,
    });
  }
});

router.get('/:id/result', isLoggedIn, async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next();
  }

  try {
    const vote = await Vote.findOne({_id: req.params.id});
    let voterAll = 0;

    for (let i = 0; i < vote.options.length; i++) {
      voterAll += vote.options[i].voted_users.length;
    }

    res.render('result', {
      vote,
      voterAll
    });
  } catch (error) {
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err);
  }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next();
  }

  try {
    await Vote.findByIdAndDelete({_id: req.params.id});
    res.status(201).end();
  } catch (error) {
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err);
  }
});

module.exports = router;
