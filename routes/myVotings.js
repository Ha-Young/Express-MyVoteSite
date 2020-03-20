const express = require('express');
const router = express.Router();
const Voting = require('../models/Voting');
const checkAuth = require('../middlewares/authenticate');

router.get('/', checkAuth, async (req, res, next) => {
  const myVotings = await Voting.find({ createdBy: req.user._id }).populate('createdBy').lean();

  myVotings.forEach(voting => {
    voting.author = voting.createdBy.username;
  });

  res.render('myVotings', { votings: myVotings });
});

module.exports = router;
