const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { checkNotAuthenticated } = require('../middlewares/auth');

router.get('/', authController.renderLogin);

router.get(
  '/github',
  checkNotAuthenticated,
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  authController.getGithubAuth,
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  authController.getGithubAuthCallback,
);

router.get('/signup', checkNotAuthenticated, authController.renderSignup);
router.post('/signup', authController.postSignup);

router.get('/login', checkNotAuthenticated, authController.renderLogin);
router.post('/login', authController.postLogin);

router.delete('/logout', authController.logout);

module.exports = router;
