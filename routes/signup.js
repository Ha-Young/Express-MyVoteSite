const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res, next) => {
  res.render('signup');
});

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username: username });

    if (user) return res.status(400).json('이미 가입된 이메일입니다.');

    user = new User({
      username
    });
    user.password = user.hashPassword(password);
    await user.save();
    res.json('ok');
  } catch(err) {
    res.status(500).json('error occured')
  }
});

module.exports = router;
