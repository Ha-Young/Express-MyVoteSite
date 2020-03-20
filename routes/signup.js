const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
  res.render('signup', { title: 'Sign Up' });
});

router.post('/', (req, res, next) => {
  if (!req.body.username.length) {
    return next('Username is empty');
  }

  if (req.body.password.length < 6) {
    return next('Password length is too short.');
  }

  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
    try {
      await User.create({
        username: req.body.username,
        password: hash
      });
      res.redirect('/login');
    } catch (err) {
      console.log('Error occured while creating a user: \n', err);

      let message;
      if (err.name === 'MongoError' && err.code === 11000) {
        message = '😥 User ID already exists';
      } else {
        message = '🤕 We had error during signing up';
      }
      return res.status(500).render('signup_error', { message });
    }
  });
});

module.exports = router;
