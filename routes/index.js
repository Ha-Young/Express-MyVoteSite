const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', message: null });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (user) {
      req.session.email = user.email;
      res.redirect('/');
    } else {
      res.render('login', { title: 'Loign', message: info.message });
    }
  })(req, res, next);
})

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register', message: req.flash('message') });
});

router.post('/register', function(req, res, next) {
  const { name, email, password } = req.body;
  User.findOne({ email: email }).then(user => {
    if (!user) {
      const newUser = new User({
        name,
        email,
        password,
        created_at: new Date()
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              req.flash('message', '등록되었습니다.');
              res.redirect('/');
            })
            .catch(err => console.log(err));
        });
      });
    } else {
      req.flash('message', '이미 있는 아이디입니다');
      res.redirect('/register');
    }
  });
});

module.exports = router;
