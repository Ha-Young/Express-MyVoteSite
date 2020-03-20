const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/User');

const { calculateRemainTime } = require('../utils/index');
const { updateVoteStatus, findVote, findVoteByOwner } = require('../middlewares/votes');
const { isAuthenticated, validateEmail, validatePassword } = require('../middlewares/authorization');

router.get('/', updateVoteStatus, findVote, async (req, res) => {
  const { votes } = res.locals;

  res.render('index', {
    votes,
    title: 'vote!',
    isLogined: req.isAuthenticated(),
    calculateRemainTime
  });
});

router.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'vote!',
    alertMessage: req.flash('alert')
  });
});

router.post('/signup', validateEmail, validatePassword, async (req, res, next) => {
  try {
    await User.create({ 
      ...req.body,
      passwordHash: bcrypt.hashSync(req.body.password, Number(process.env.BCRYPT_SALT_ROUNDS))
    });
    
    req.flash('alert', '가입을 축하드립니다');
    return res.redirect('/login');
  } catch (error) {
    return next({
      status: 500,
      message: 'Internal Server Error'
    });
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

router.get('/my-votings', isAuthenticated, updateVoteStatus, findVoteByOwner, async (req, res) => {
  const { user, votes } = res.locals;
  res.render('myVotings', {
    user,
    votes,
    title: 'vote!',
    calculateRemainTime,
    isLogined: req.isAuthenticated()
  });
});

module.exports = router;
