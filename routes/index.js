const express = require('express');
const router = express.Router();
const Voting = require('../models/Voting');

router.get('/', async (req, res, next) => {
  const allVotings = await Voting.find();
  
  res.render('index', {
    allVotings,
    currentDate: new Date().getTime()
  });
});

module.exports = router;
