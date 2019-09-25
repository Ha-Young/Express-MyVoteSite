const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('./middleware/auth');

const {
  getProblemList,
  login,
  loginGithub,
  githubCallback,
  logout,
  signup,
  loginLocal,
} = require('./controllers/authenticate');

router.get('/', ensureAuthenticated, getProblemList);
router.get('/signup', signup);
router.get('/login', login);

router.post('/login/local',loginLocal,
  (req, res) => {
    req.session.save(function() {
      res.redirect('/');
    });
  }
);

// router.post('/newproblem', function (req, res, next) {
//   const Vote = require('../models/Vote');
//   const newVote = new Vote(req.body);
//   console.log(newVote);
//   newVote.save();
//   res.send(newVote)
// })

router.get('/login/github', loginGithub);
router.get('/login/github/callback', githubCallback, (req, res) => {
  res.redirect('/');
});

router.get('/logout', logout);

module.exports = router;
