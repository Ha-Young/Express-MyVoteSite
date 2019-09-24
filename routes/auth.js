const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/User');

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nickname, password } = req.body;

  try {
    const exUser = await User.findOne({ email });

    if (exUser) {
      req.flash('joinError', '이미 가입된 이메일입니다.');
      return res.status(301).redirect('/join');
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nickname,
      password: hash
    });

    return res.status(301).redirect('/');
  } catch (error) {
    const err = new Error('Internal Server Error');
    err.status = 500;
    return next(err);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      return next(authError);
    }

    if (!user) {
      req.flash('loginError', info.message);
      return res.status(301).redirect('/login');
    }

    return req.login(user, loginError => {
      if (loginError) {
        next(loginError);
      }

      return res.status(301).redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.status(301).redirect('/');
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/auth/login'
}), (req, res) => {
    res.status(301).redirect('/');
});

module.exports = router;
