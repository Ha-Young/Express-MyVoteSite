var express = require('express');
var router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authController = require('./controllers/authController');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', (req, res) => {
  res.render('register', {
    title: '회원가입'
    //user: req.user,
    //joinError: req.flash('joinError'),
  });
});

router.post('/register', authController.validateRegister, async (req, res, next) => {
  const { email, password, name } = req.body;
  console.log('email' + email);
  try {
    const exUser = await User.findOne({ email });

    if (exUser) {
      //req.flash('joinError', '이미 가입된 이메일입니다.');
      return res.redirect('/register');
    }
    await bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        User.create({
          name,
          email,
          password: hash,
        });
      });
    });

    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'glglgl' });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.log('authError', authError);
      return next(authError);
    }
    if (!user) {
      //req.flash('loginError', info.message);
      console.log('user 없음 실패')
      return res.redirect('/login');
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      console.log('성공');
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

/*router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true
  });
});*/


router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
