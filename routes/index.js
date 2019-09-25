const express = require('express');
const router = express.Router();
const Voting = require('../models/Voting');
const User = require('../models/Users');

router.get('/', async(req, res, next) => {
  const votings = await Voting.find({});
  const editedVotings = await Promise.all(await votings.map(async(voting) => {
    const creatorUserId = voting.creator;
    const editedVoting = JSON.parse(JSON.stringify(voting._doc));
    const user = await User.findOne({ _id: creatorUserId });
    editedVoting.creator = user.name;
    const today = new Date();
    const expirationDay = voting.end_at;
    const difference = expirationDay - today;
    const isOnProgress = (difference > 0);
    editedVoting.isOnProgress = isOnProgress;
    return editedVoting;
  }));
  res.render('index', {
    user: req.user,
    votings: editedVotings
  });
});

module.exports = router;
