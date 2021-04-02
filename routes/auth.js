const express = require('express');
const passport = require('passport');
const authController = require('../controller/auth.controller');

const router = express.Router();

router.get('/signup', authController.signup);
router.post('/signup', authController.post);
router.get('/logout', authController.logout);
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
    failureFlash: true,
  }),
  authController.result,
);
router.get('/login', authController.login);
router.get('/login/:id', authController.login);

module.exports = router;
