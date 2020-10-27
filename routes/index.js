const express = require('express');
const router = express.Router();
const gateKeeper = require('./middlewares/gateKeeper');
const Voting = require('../models/Voting');

router.get('/', gateKeeper, async (req, res, next) => {
  const votings = await Voting.find();

  res.render('index', { votings });
});

module.exports = router;
