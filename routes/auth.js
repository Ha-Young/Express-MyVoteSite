const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const router = express.Router();

router.get('/signup', function (req, res, next) {
  res.status(200).render('signup');
});

router.post('/signup', async function (req, res, next) {
  const {
    body: { email, password, passwordConfirmation, username }
  } = req;

  if (password !== passwordConfirmation || !username) {
    console.log('[/signup] check input value');
    return res.redirect('/auth/signup');
  }

  try {
    const user = await User.findOne({ email });
    if (user) return res.redirect('/auth/login');

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      hash,
      username
    });

    req.session.user = newUser;
    // res.locals.user = req.session.user;

    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/login', function (req, res, next) {
  res.status(200).render('login');
});

router.post('/login', async function (req, res, next) {
  const {
    body: { email, password }
  } = req;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.redirect('/');

    const isUserValidated = await bcrypt.compare(password, user.hash);
    if (!isUserValidated) return res.redirect('/auth/login');

    req.session.user = {
      email: user.email,
      username: user.username,
      myVoteList: user.myVoteList
    };

    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
