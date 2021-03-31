const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/', authController.renderLogin);

router.get(
  '/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  authController.getGithubAuth,
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  authController.getGithubAuthCallback,
);

router.get('/signup', authController.getRegister);
router.post('/signup', authController.postRegister);

router.get('/login', authController.renderLogin);
router.post('/login', authController.postLogin);

router.delete('/logout', authController.logout);

module.exports = router;
