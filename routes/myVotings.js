const express = require('express');
const Users = require('../models/Users');
// const Votes = require('../models/Votes');

const checkAuthentication = require('../middlewares/authenticate');
const { getDisplayInfo } = require('../lib/helpers');

const router = express.Router();

router.get('/', checkAuthentication, async (req, res) => {
  const loggedInUser = await Users.findById(req.user._id).populate({
    path: 'votes_created',
    populate: { path: 'created_by' }
  });

  const votes = loggedInUser.votes_created;

  let expiredCounter = 0;
  const voteDisplayInfo = [];
  votes.forEach(vote => {
    if (vote.expired) expiredCounter++;
    voteDisplayInfo.push(getDisplayInfo(vote));
  });

  res.render('home', {
    loggedInUser,
    votes: voteDisplayInfo,
    expiredCounter
  });
});

module.exports = router;
