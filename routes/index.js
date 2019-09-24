const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

const authorizeUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(302).redirect('/login');
}

router.get('/', authorizeUser, (req, res, next) => {
  res.render('index', { title: 'Main' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'signup', message : ''});
});

router.post('/signup', async (req, res, next) => {
  try {
    const hasUser = await User.exists({ email: req.body.email });

    if (hasUser) {
      req.flash('error', 'Email address already subscribed.');
      return res.render('signup', { title: 'signup', message: req.flash('error') });
    }

    const newUser = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    }

    if (req.body.password !== req.body.repeatedPassword) {
      req.flash('error', 'Please write the same two passwords.');
      return res.render('signup', { title: 'signup', message: req.flash('error') });
    }

    if (req.body.profileImgUrl) {
      newUser.profile_img_url = req.body.profileImgUrl;
    }

    await new User(newUser).save();

    res.status(302).redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'login', message: req.flash('error') });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

module.exports = router;
