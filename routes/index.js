const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/User');
const Vote = require('../models/Vote');

const { isAuthenticated } = require('../middlewares/authorization');
const { calculateRemainTime, updateVoteStatus } = require('../middlewares/utils');

router.get('/', updateVoteStatus, async (req, res, next) => {
  const { votesInProgress, votesEnds } = res.locals;

  res.render('index', {
    votesInProgress,
    votesEnds,
    calculateRemainTime,
    title: 'vote!',
    isLogined: req.isAuthenticated(),
    
  });
});

router.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'vote!',
    alertMessage: req.flash('alert')
  });
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      req.flash('alert', '이미 가입된 이메일 주소입니다 다른 이메일을 입력하여 주세요');
      return res.redirect('/signup');
    }

    if (req.body.password !== req.body.passwordCheck) {
      req.flash('alert', '비밀번호가 일치하지 않습니다');
      return res.redirect('/signup');
    }

    await User.create({ 
      ...req.body,
      passwordHash: bcrypt.hashSync(req.body.password, Number(process.env.BCRYPT_SALT_ROUNDS))
    });
    req.flash('alert', '가입을 축하드립니다');
    return res.redirect('/login');
  } catch (error) {
    return next(error);
  }
});

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'vote!',
    alertMessage: req.flash('alert'),
    errorMessage: req.flash('error')[0]
  });
});

router.get('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/');
})

router.get('/my-votings', isAuthenticated, async (req, res) => {
  const user = await User.findById(req.session.passport.user);
  const votes = await Vote.find({ "owner._id": user._id });
  res.render('myVotings', {
    user,
    votes,
    title: 'vote!',
    calculateRemainTime,
    isLogined: req.isAuthenticated()
  });
});

module.exports = router;
