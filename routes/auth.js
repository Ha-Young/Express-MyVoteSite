const router = require('express').Router();
const passport = require('passport');

const {
  getSignUpForm,
  createUser,
  getLoginForm,
  logOut
} = require('../controllers/auth.controller');
const { authenticateAuth } = require('../middlewares/authenticationHandler');
const { validateSignup, validateLogin } = require('../middlewares/validationHandler');

router.use(authenticateAuth);

router
  .route('/signup')
  .get(getSignUpForm)
  .post(validateSignup, createUser);

router
  .route('/github')
  .get(passport.authenticate('github', { scope: ['user:email'] }));

router
  .route('/github/callback')
  .get(passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  }));

router
  .route('/login')
  .get(getLoginForm)
  .post(validateLogin, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  }));

router
  .route('/logout')
  .get(logOut);

module.exports = router;
