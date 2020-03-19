const express = require('express');
const router = express.Router();
const Voting = require('../models/Voting');
const votingControllers = require('../controllers/voting.controllers');

router.get('/', votingControllers.updateExpired, async (req, res, next) => {
  const votings = await Voting.find().populate('createdBy').lean();
  let isUser = req.user ? true : false;

  votings.forEach(voting => {
    voting.author = voting.createdBy.username;
  });

  res.render('index', { votings, isUser });
});

module.exports = router;
