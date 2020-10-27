const express = require('express');
const { authenticate } = require('./middlewares/authenticate');
const myVotingController = require('./controllers/my-voting.controller');
const router = express.Router();

router.get('/',
  authenticate,
  myVotingController.getAllMyVotes,
  (req, res, next) => {
    const myVotes = req.myVotes;
    res.render('my-votings', { myVotes });
});

module.exports = router;
