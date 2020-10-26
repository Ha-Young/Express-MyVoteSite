const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../Model/User');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  const { email, password, 'password-confirm': passwordConfirm } = req.body;
  const userData = { email, password, passwordConfirm };

  if (password !== passwordConfirm) {
    res.render('signup', {
      ...userData,
      error: '비밀번호를 일치시켜주세요.',
    });
    return;
  }

  try {
    const userData = await User.findOne({ email });

    if (userData) {
      res.render('signup', {
        userData,
        error: '동일한 이메일이 존재합니다.',
      });

      return;
    }
  } catch (err) {
    next(err);
    return;
  }

  try {
    const hasedPassword = await bcrypt.hash(password, 10);
    userData.password = hasedPassword;
  } catch (err) {
    next(err);
    return;
  }

  try {
    await User.create(userData);
  } catch (err) {
    next(err);
    return;
  }

  res.redirect('/login');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.get('/logout', (req, res, next) => {
  res.render('logout');
});

module.exports = router;
