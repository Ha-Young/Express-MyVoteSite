const express = require('express');
const router = express.Router();
const passport = require('passport');

const { validator } = require('../middlewares/validator');
const signupController = require('../controllers/signup.Controller');

const Vote = require('../models/Vote');

router.get('/', async (req, res, next) => {
  const today = new Date(Date.now());

  await Vote.updateMany(
    { expirationDate: { $lte: today }},
    { isExpired: true }
  );

  const votes = await Vote.find();
  res.render('index', { votes });
});

router.get('/login', (req, res, next) => {
  const visited = req.headers.referer;

  res.render('login', { visited });
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/'
}), (req, res) => {
  const visited = req.query.vote;

  if (visited) {
    res.redirect(visited);
  } else {
    res.redirect('/');
  }
});
// 하나의 요청주소에서는 언제나 동일한 응답을 받을 수 있어야한다.

router.get('/logout', (req, res) => {
  req.logout();
  req.session.save(() => {
    res.redirect('/');
  });
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup',
  validator,
  // signupController.passwordConfirmation,
  signupController.register, (req, res, next) => {
    res.redirect('/login');
  }
);

module.exports = router;
