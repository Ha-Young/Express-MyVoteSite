const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const isLoggedIn = require('./middleware/isLoggedIn');
const User = require('../models/user');

const SALT = 6;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vote Flatform' });
});

router.get('/logout', isLoggedIn, (req, res, next) => {
  res.render('logout');
});

router.get('/logout/callback', isLoggedIn, (req, res, next)=> {
  if (req.session) {
    try {
      req.logOut();
      req.session.destroy();
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  } else {
    res.redirect('/');
  }
})

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  const email = await User.findOne({ id: req.body.email });

  if (email) {
    req.flash("usedEmail", "등록된 이메일입니다.");
    res.redirect('/login');

    return;
  }

  try {
    const hash = await bcrypt.hash(req.body.password, SALT);

    await User.create({
      id: req.body.email,
      password: hash,
      nickname: req.body.name,
    });

    res.redirect('/');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
