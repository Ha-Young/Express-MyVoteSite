const express = require('express');
const router = express.Router();
const Voting = require('../models/Voting');
const { switchIdToName, addIsOnProgressPropertyTo } = require('../util');
const { isLoggedIn } = require('./middlewares');

router.get('/', isLoggedIn, async(req, res, next) => {
  const votings = await Voting.find({});
  const editedVotings = await Promise.all(await votings.map(async(voting) => {
    const creatorUserId = voting.creator;
    const editedVoting = JSON.parse(JSON.stringify(voting._doc));
    await switchIdToName(creatorUserId, editedVoting);
    await addIsOnProgressPropertyTo(editedVoting, voting);
    return editedVoting;
  }));

  res.render('index', {
    user: req.user,
    votings: editedVotings
  });
});

module.exports = router;
