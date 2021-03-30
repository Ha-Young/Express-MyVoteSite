const router = require('express').Router();
const passport = require('passport');

const authController = require('../controllers/auth.controller');
const authenticationHandler = require('../middlewares/authenticationHandler');
const validationHandler = require('../middlewares/validationHandler');

router.use(authenticationHandler.auth);

router
  .route('/signup')
  .get(authController.getSignUpForm)
  .post(validationHandler.signup, authController.createUser);

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
  .get(authController.getLoginForm)
  .post(validationHandler.login, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  }));

router
  .route('/logout')
  .get(authController.logOut);

module.exports = router;
