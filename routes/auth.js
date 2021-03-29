const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const checkAuthentication = require('../middlewares/checkAuthentication');

router
  .route('/signup')
  .get(authController.getSignUpForm)
  .post(authController.createUser);

router
  .route('/login')
  .get(authController.getLoginForm)
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  }));

router
  .route('/logout')
  .get(checkAuthentication, authController.logOut);

module.exports = router;
