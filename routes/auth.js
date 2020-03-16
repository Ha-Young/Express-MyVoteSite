const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');


router.get('/login', (req, res, next) => {
  res.render('login', {
    message: ''
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, success, fail) => {
    if (err) {
      return next(err);
    }
    if (!success) {
      req.flash('loginError', fail.message);
      return res.render('login', {
        message: req.flash('loginError')
      });
    }
    return req.login(success, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.redirect('/');
    })
  })(req, res, next);
});


router.get('/signup', (req, res, next) => {
  res.render('signup', {
    message: ''
  });
});

router.post('/signup', async (req, res, next) => {
  const { userEmail, userPassword } = req.body;

  try {
    if (userPassword[0] !== userPassword[1]) {
      req.flash('joinError', '비밀번호가 일치하지 않습니다.');
      return res.render('signup', {
        message: req.flash('joinError')
      });
    }

    const user = await User.findOne({ email_id: userEmail });

    if (user) {
      req.flash('registeredMembers', '이미 가입된 회원입니다. 로그인 하세요.');
      return res.render('signup', {
        message: req.flash('registeredMembers')
      });
    } else {
      console.time('암호화 시간');
      const hash = await bcrypt.hash(userPassword[0], 12);
      console.time('암호화 시간');
      await User.create({
        email_id: userEmail,
        password: hash
      });
      return res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
