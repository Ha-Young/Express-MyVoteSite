const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const isLoggedIn = require('./middleware/isLoggedIn');

const User = require('../models/user');

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  const email = await User.findOne({ email: req.body.email });

  if (email) {
    req.flash("usedEmail", "등록된 이메일입니다.");
    res.redirect('/login');

    return;
  }

  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    await User.create({
      nickname: req.body.name,
      email: req.body.email,
      password: hash,
    });

    res.redirect('/');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
