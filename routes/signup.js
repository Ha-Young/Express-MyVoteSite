const express = require('express');
const router = express.Router();
const User = require('../models/User');
const error = require('../lib/error');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', async (req, res, next) => {
  try {
    const { email, nickname, password, confirm } = req.body;
    const userByEmail = await User.findOne({ email });
    const userByNickname = await User.findOne({ nickname });
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    if (userByEmail) throw new error.SignupEmailError();
    if (userByNickname) throw new error.SignupNicknameError();
    if (password !== confirm) throw new error.SignupPasswordError();

    await new User({ email, nickname, password: hash }).save();

    res.redirect('/auth/login');
  } catch (err) {
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
