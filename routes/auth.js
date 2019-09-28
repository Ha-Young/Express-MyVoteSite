const router = require('express').Router();
const passport = require('passport');
const LocalUser = require('../models/Local-user');
const bcrypt = require('bcrypt');

const authCheck = function (req, res, next) {
  if (!req.user) {
    next();
  } else {
    res.redirect('/');
  }
};

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'voting-platform',
    user: req.user
  });
});

router.get('/localLoginPage', (req, res) => {
  res.render('localLoginPage', {
    title: 'voting-platform',
    user: req.user
  });
});

router.post('/local', (req,res,next) => {
  passport.authenticate('local', {
    failureRedirect: '/auth/localLoginPage',
    successRedirect: '/'
  })(req,res,next);
});

router.get('/sign-up', (req, res) => {
  res.render('sign-up', {
    title: 'voting-platform',
    user: req.user
  });
});

router.post('/sign-up',
  async(req, res, next) => {
    try {
      const localUser = await LocalUser.findOne({ username: req.body.username });
      if (localUser) {
        req.flash('이미 등록된 아이디 입니다!! Local Login하세요!!');
        return res.redirect('/auth/localLoginPage');
      }
      const hash = await bcrypt.hash(req.body.password, 12);
      await LocalUser.create({
        username: req.body.username,
        password: hash
      })
      return res.redirect('/');
    } catch(error) {
      next(error);
    }
  }
)

router.get('/logout', (req, res) => {
  req.logout();
  res.render('logout', {
    title: 'voting-platform',
    user: req.user
  });
});

router.get('/google', authCheck, passport.authenticate('google', {
  scope: ['profile ']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

module.exports = router;
