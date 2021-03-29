const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const checkAuthentication = require('../middlewares/checkAuthentication');
const validationHandler = require('../middlewares/validationHandler');

router
  .route('/signup')
  .get(authController.getSignUpForm)
  .post(validationHandler.signup, authController.createUser);

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
  .get(checkAuthentication, authController.logOut);

module.exports = router;
