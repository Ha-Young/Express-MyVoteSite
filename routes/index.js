const express = require('express');
const router = express.Router();
const passportLocal = require('../config/passport');
const User = require('../models/User');
const Voting = require('../models/Voting');
const { check, validationResult } = require('express-validator');
const { ensureAuthenticated } = require('../middlewares/authorization');

router.get('/', (req, res, next) => {
  if(!req.user) return res.render('index');
  const user = req.user.email.split('@')[0];
  res.render('index', { user });
});

router.get('/login', (req, res, next) => {
  const flash = req.flash();
  if (flash.error) return res.render('login', { loginMsg: flash.error[0] });
  if (flash.signUpMsg) return res.render('login', { loginMsg: flash.signUpMsg[0] });
  res.render('login', { loginMsg: 'Sign In'});
});

router.post('/login', 
  passportLocal.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login', 
    failureFlash: true,
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

router.post('/signup', [
  check('email')
    .notEmpty()
    .withMessage('Please fill out the email.')
    .isEmail()
    .withMessage('Please fill it out in e-mail format.'),
  check('password')
    .notEmpty()
    .withMessage('Please fill out the password.')
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/)
    .withMessage('Passwords are 8-15 characters long and must contain one lower case/upper case/numeric character.'),
  check('passwordConfirmation')
    .notEmpty()
    .withMessage('Please fill in the password check box.')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('The passwords you entered is different.'),
], async (req, res, next) => {
  try {
    const errors = validationResult(req).errors;

    if(!errors.length) {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
      });
  
      await newUser.save();
      req.flash('signUpMsg', 'Welcome. :) Login Please.');
      res.status(307).redirect('/login');
    } else {
      return res.render('postFail', { message: errors[0].msg });
    }
  } catch (err) {
    if (err.errmsg.split(' ')[1] === 'duplicate') {
      return res.render('postFail', { message: '이메일이 중복되었습니다.'});
    } else {
      next(err);
    }
  }
});

router.get('/votings/new', ensureAuthenticated, (req, res, next) => {
  const user = req.user.email.split('@')[0];
  res.render('create', { user });
});

router.post('/votings/new', [
  check('title')
    .notEmpty()
    .withMessage('Please fill out title.'),
  check('expiration_time')
    .notEmpty()
    .withMessage('The expiration date/time does not exist or It is earlier than the current time.')
    .custom((value, { req }) => {
      const mergedDateTime = req.body.expiration_date + ' ' + value;
      return new Date() < new Date(mergedDateTime);
    })
    .withMessage('Please fill out the expiration date later than the current time.'),
  check('options')
    .exists()
    .custom((value, { req }) => value.every(option => option.length > 0))
    .withMessage('Please fill out at least two options.'),
], ensureAuthenticated, async (req, res, next) => {
  try {
    const errors = validationResult(req).errors;
    if (!errors.length) {
      const mergedDateTime = req.body.expiration_date + ' ' + req.body.expiration_time;
      const createdExpiration = new Date(mergedDateTime);
    
      const newVoting = new Voting({
        title: req.body.title,
        made: req.user._id,
        expiration_date: createdExpiration,
        description: req.description,
        options: {},
      });
    
      req.body.options.forEach((option) => {
        newVoting.options.set(option, 0);
      });
      await newVoting.save();
      res.status(307).redirect('/');
    } else {
      return res.render('postFail', { message: errors[0].msg });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
