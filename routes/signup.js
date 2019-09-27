const router = require('express').Router();
const { saveSession } = require('./middlewares/auth');
const email = require('email-validator');
const User = require('../models/User');

router.get('/', (req, res, next) => {
  res.render('signup/signup', {
    title: 'Please Signup to Vote',
    message: ''
  });
});

router.post('/', async (req, res, next) => {
  try {
    if (!email.validate(req.body.email)) {
      res.render('signup/signup', {
        title: 'Please Signup to Vote',
        message: 'Invalid email'
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      res.render('signup/signup', {
        title: 'Please Signup to Vote',
        message: 'Invalid password'
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.render('signup/signup', {
        title: 'Please Signup to Vote',
        message: 'Email already exists'
      });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
      await newUser.save();
      saveSession(null, newUser, req, res, next);

      res.status(201).render('complete', {
        title: 'Please Signup to Vote',
        message: 'Now you are signed-up!'
      });
    }
  } catch(err) {
    next(err);
  }
});

module.exports = router;
