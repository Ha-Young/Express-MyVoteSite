const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Voting = require('../models/Voting');
const moment = require('moment');
const checkUser = require('../middlewares/checkUser');
const { findUser } = require('../utils/helpers');

router.get('/', async (req, res, next) => {
  const user = await findUser(req);
  const votings = await Voting.find().populate('user', 'nickname');
  votings.forEach(voting => {
    console.log(new Date(voting.created_at).toLocaleString());
    voting.created_at = new Date(voting.created_at).toLocaleString();
  });

  console.log(votings);
  res.render('index', { user, votings, moment });
});

router.get('/my-votings', checkUser, async (req, res) => {
  const user = await findUser(req);

  res.render('my-votings', { user });
});

module.exports = router;
