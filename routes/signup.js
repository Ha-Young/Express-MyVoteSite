const express = require('express');
const router = express.Router();
const User = require('../models/User');
const error = require('../lib/error');

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', async (req, res, next) => {
  const { email, nickname, password, confirm } = req.body;
  const userByEmail = await User.findOne({ email });
  const userByNickname = await User.findOne({ nickname });
  console.log('sdsdsdsdsd', userByEmail);

  try {
    if (userByEmail) throw new error.SignupEmailError();
    if (userByNickname) throw new error.SignupNicknameError();
    if (password !== confirm) throw new error.SignupPasswordError();

    new User({ email, nickname, password }).save();
    console.log('==============');
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    if (err instanceof error.SignupEmailError) {
      return res.render('signup', { emailError: err.displayMessage });
    }
    if (err instanceof error.SignupNicknameError) {
      return res.render('signup', { nicknameError: err.displayMessage });
    }
    if (err instanceof error.SignupPasswordError) {
      return res.render('signup', { passwordError: err.displayMessage });
    }
    next(new error.GeneralError());
  }
});

module.exports = router;
