const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/User');
const Vote = require('../models/Vote');

const { isAuthenticated } = require('../middlewares/authorization');

router.get('/', async (req, res, next) => {
  const votes = await Vote.find();
  res.render('index', { 
    title: 'Time to Vote',
    isLogined: req.isAuthenticated(),
    votes
  });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      console.log('이미 존재하는 사용자입니다');
      return res.redirect('/login');
    }

    if (req.body.password !== req.body.passwordCheck) {
      console.log('비밀번호가 서로 다릅니다');
      return res.redirect('/login');
    }

    await new User({ 
      ...req.body,
      passwordHash: bcrypt.hashSync(req.body.password, Number(process.env.BCRYPT_SALT_ROUNDS))
   }).save();
    console.log('가입을 축하드립니다');
    return res.redirect('/login');
  } catch (error) {
    return next(error);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/');
})

router.get('/my-votings', isAuthenticated, async (req, res) => {
  const user = await User.findById(req.session.passport.user);
  const votes = await Vote.find({ owner: user._id });
  res.render('myVotings', {
    votes
  });
});

module.exports = router;
