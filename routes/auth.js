const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/User');
const router = express.Router();

/* GET home page. */

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.find({ email: req.body.email });
    if (exUser.length !== 0) {
      req.flash('joinError', '이미 가입된 이메일입니다');
      res.redirect('/join');
    }
    const hash = await bcrypt.hash(req.body.password, 12);
    await User.create(
      {
        email: req.body.email,
        nickname: req.body.nickname1,
        password: hash,
        provider: 'local'
      }
    );
    res.redirect('/');
  } catch (error) {
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      next(authError);
    }
    if (!user) {
      return res.redirect('/login');
    }
    return req.login(user, loginError => {
      if (loginError) {
        console.error(loginError);
        next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
