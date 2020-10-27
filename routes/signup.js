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
    res.status(200).render('signupFailure', { message: '형식을 지키세요' });

    return;
  }

  const emailSearchResult = await User.findOne({ email });

  if (emailSearchResult) {
    res.status(302).render('signupFailure', { message: '이미 가입한 이메일입니다' });

    return;
  }

  const newUserData = new User({
    email,
    password,
    votings: [],
  });

  User.create(newUserData, (err, user) => {
    if (err) {
      next(err);

      return;
    }

    res.status(302).redirect('/login');
  });
});

module.exports = router;
