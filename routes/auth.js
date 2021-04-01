const express = require('express');
const passport = require('passport');
const authController = require('../controller/auth.controller');

const router = express.Router();

router.get('/signup', authController.signup);
router.post('/signup', authController.post);
router.get('/login', authController.login);
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  }),
);
router.get('/logout', authController.logout);

module.exports = router;
