const express = require('express');
const router = express.Router();
const passportLocal = require('../config/passport');
const User = require('../models/User');

router.get('/', (req, res, next) => {
  if(!req.user) return res.render('index');
  const user = req.user.email.split('@')[0];
  res.render('index', { user });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', 
  passportLocal.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login' 
  }));

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    res.status(302).redirect('/');
  });
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.email[0],
    });
    await newUser.save();
    res.status(307).redirect('/login');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
