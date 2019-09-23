const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { validateUser } = require('./middleware/validation');
const { isAuthenticated } = require('./middleware/authentication');

router.get('/', isAuthenticated, (req, res, next) => {
  res.render('index', { title: 'Express', loginMessage: req.flash('success')[0] });
});

router.get('/login', (req, res, next) => {
  res.render('login', {
    message: req.flash('joinMessage')[0] || req.flash('error')[0]
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect: '/login',
  failureFlash: true,
  successFlash: 'Welcome!'
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/join', (req, res, next) => {
  res.render('join', { error: req.flash('error')[0] });
});

router.post('/join', validateUser, async (req, res, next) => {
  try {
    const {
      email,
      name,
      password
    } = req.body;

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    await new User({
      email,
      name,
      password: hash
    }).save();

    req.flash('joinMessage', '회원가입이 완료되었습니다.');

    return res.redirect("/login");
  } catch (err) {
    console.error(err);

    const dbValidationError = err.errors.name || err.errors.password || err.errors.email;

    if (dbValidationError) {
      req.flash('error', dbValidationError.message);
    }

    return res.redirect("/join");
  }
});

module.exports = router;
