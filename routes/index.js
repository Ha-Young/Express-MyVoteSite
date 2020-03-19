const express = require('express');
const router = express.Router();
const Voting = require('../models/Voting');

router.get('/', async (req, res, next) => {
  const votings = await Voting.find().populate('createdBy').lean();

  votings.map(voting => {
    voting.author = voting.createdBy.username;
  });

  res.render('index', { votings });
});

module.exports = router;
