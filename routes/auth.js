const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { checkLoggedOut } = require('../middlewares/auth');

router.get('/', authController.renderLogin);

router.get(
  '/github',
  checkLoggedOut,
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  authController.getGithubAuth,
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  authController.getGithubAuthCallback,
);

router.get('/signup', checkLoggedOut, authController.renderSignup);
router.post('/signup', authController.postSignup);

router.get('/login', checkLoggedOut, authController.renderLogin);
router.post('/login', authController.postLogin);

router.delete('/logout', authController.logout);

module.exports = router;
