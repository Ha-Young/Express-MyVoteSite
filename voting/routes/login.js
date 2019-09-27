const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/', (req, res) => {
  res.render('login', { error: req.flash('error') });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/');
    }
    return req.login(user, error => {
      if (error) {
        return next(error);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      req.flash('email', '이미 가입된 이메일입니다.');
      return res.redirect('/login');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      name,
      password: hash
    });
    return res.redirect('/');
  } catch (error) {
    //console.error(error);
    return next(error);
  }
});

module.exports = router;
