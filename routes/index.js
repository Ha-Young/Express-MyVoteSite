const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Voting = require('../models/Voting');
const moment = require('moment');

router.get('/', async (req, res, next) => {
  const userId = req.user;
  const user = await User.findById(userId);
  const votings = await Voting.find().populate('user', 'nickname');
  votings.forEach(voting => {
    console.log(new Date(voting.created_at).toLocaleString());
    voting.created_at = new Date(voting.created_at).toLocaleString();
  });

  console.log(votings);
  res.render('index', { user, votings, moment });
});

module.exports = router;
