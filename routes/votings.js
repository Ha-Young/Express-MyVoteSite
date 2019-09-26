const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Vote = require('../models/Vote');
const User = require('../models/User');



router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const voteList = await Vote.find({ user_id: req.user._id });
    const votes = await Promise.all(voteList.map(async vote => {
      const voteDoc = JSON.parse(JSON.stringify(vote._doc));
      const nowDate = new Date();

      if (vote.expired_at - nowDate > 0) {
        voteDoc.status = '진행중';
      } else {
        voteDoc.status = '종료';
      }

      return voteDoc;
    }));

    console.log(votes);

    res.render('my', {
      votes
    });
  } catch (error) {
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err);
  }
});

router.get('/new', isLoggedIn, (req, res, next) => {
  res.render('new', {
    title: '투표 생성'
  });
});

router.post('/new', isLoggedIn, async (req, res, next) => {
  console.log(req.user);
  // console.log(req.body.options);

  const options = [];

  req.body.options.forEach(item => {
    const temp = {};

    temp.text = item;
    temp.users = [];
    options.push(temp);
  });

  try {
    await Vote.create({
      title: req.body.title,
      user_id: req.user._id,
      options: options,
      expired_at: req.body.expired,
    });

    return res.render('success', {
      message: `투표가 성공적으로 생성되었습니다.`
    });

    // return res.status(301).redirect('/');
  } catch (error) {
    return res.render('error', {
      message: `투표생성이 실패했습니다.`,
      error
    });
    // const err = new Error('Internal Server Error');
    // err.status = 500;
    // return next(err);
  }
});

router.get('/:id', isLoggedIn, async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next();
  }

  console.log(req.params.id);

  try {

    const vote = await Vote.findOne({_id: req.params.id});
    const user = await User.findOne({_id: vote.user_id});
    let isVoting = false;

    for (let i = 0; i < vote.options.length; i++) {
      isVoting = vote.options[i].users.some(item => {
        return String(item) === String(req.user._id);
      });

      if (isVoting) break;
    }

    const nowDate = new Date();

    if (vote.expired_at - nowDate > 0) {
      vote.name = user.name;
      vote.status = '진행중';

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
      vote.status = '종료';

      res.render('result', {
        vote
      });
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

  console.log(req.params.id);
  console.log(Number(req.body.voteOptions));

  const voteId = req.params.id;
  const selectedIndex = `options.${req.body.voteOptions}.users`;

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
});

router.get('/:id/result', isLoggedIn, async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next();
  }

  try {
    const vote = await Vote.findOne({_id: req.params.id});

    res.render('result', {
      vote
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
