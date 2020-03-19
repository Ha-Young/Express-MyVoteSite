const express = require('express');
const router = express.Router();

const { validator } = require('../middlewares/validator');
const { authorization } = require('../middlewares/authorization');
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
  res.render('login');
});

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
    res.redirect('/');
  }
);

module.exports = router;
