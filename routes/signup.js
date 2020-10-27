const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.status(200).render('signup');
});

router.post('/', async (req, res, next) => {
  const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const { email, password } = req.body;
  const passwordConfirm = req.body['password-confirm'];

  if (
    !email.match(emailFormat)
    || password.length < 4
    || passwordConfirm.length < 4
    || password !== passwordConfirm
  ) {
    res.status(302).redirect('/signup');

    return;
  }

  const emailSearchResult = await User.find({ email });

  if (emailSearchResult.length) {
    res.status(302).redirect('/signup');

    return;
  }

  const newUserData = {
    email,
    password,
    votes: [],
  };

  User.create(newUserData, (err, user) => {
    if (err) {
      next(err);

      return;
    }

    res.status(302).redirect('/login');
  });
});

module.exports = router;
