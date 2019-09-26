const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('./middleware/auth');
const { getAllVoteInfo } = require('./controllers/votings.controllers');

const {
  login,
  loginGithub,
  githubCallback,
  logout,
  signup,
  loginLocal
} = require('./controllers/authenticate');

router.get('/', ensureAuthenticated, getAllVoteInfo);
router.get('/signup', signup);
router.get('/login', login);

router.post('/login/local', loginLocal, (req, res) => {
  req.session.save(function() {
    res.redirect('/');
  });
});

router.get('/login/github', loginGithub);
router.get('/login/github/callback', githubCallback, (req, res) => {
  res.redirect('/');
});

router.get('/logout', ensureGuest, logout);

module.exports = router;
