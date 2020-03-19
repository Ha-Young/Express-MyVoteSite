const express = require('express');
const router = express.Router();
const Voting = require('../models/Voting');
const moment = require('moment');
const checkUser = require('../middlewares/checkUser');
const { findUser } = require('../utils/helpers');

router.get('/', async (req, res, next) => {
  const user = await findUser(req);
  let votings = await Voting.find();
  const updatedVotings = votings.map(voting => {
    if (!voting.is_expired) {
      const deadline = voting.deadline.getTime();
      const current = new Date().getTime();
      console.log(2);
      if (deadline < current) {
        return Voting.findByIdAndUpdate(voting._id, { is_expired: true });
      }
    } else {
      return voting;
    }
  });

  await Promise.all(updatedVotings);
  votings = await Voting.find().populate('user', 'nickname');

  res.render('index', { user, votings, moment });
});

router.get('/my-votings', checkUser, async (req, res) => {
  const user = await findUser(req);
  const votings = await Voting.find({ user: user._id }).populate('user', 'nickname');
  console.log(votings);
  res.render('my-votings', { user, votings, moment });
});

module.exports = router;
