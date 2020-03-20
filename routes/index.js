const express = require('express');
const router = express.Router();
const passport = require('passport');
const { showIndex, showLogin, showSignup, checkVaildAccount } = require('../controllers/indexController');

router.get('/', showIndex);

router.get('/login', showLogin);

router.post(
  '/login',
  passport.authenticate('local-login', { failureRedirect: '/login' }),
  (req, res) => {
    if (
      req.body.referer &&
      req.body.referer !== undefined &&
      req.body.referer.slice(-6) !== '/login' &&
      req.body.referer.slice(-7) !== '/signup'
    ) {
      res.redirect(req.body.referer);
    } else {
      res.redirect('/');
    }
  }
);

router.get('/logout', async (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect('/login');
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

router.get('/signup', showSignup);
router.post(
  '/signup',
  checkVaildAccount,
  passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup'
  })
);

module.exports = router;
