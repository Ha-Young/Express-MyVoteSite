const express = require('express');

const Vote = require('../models/Vote');
const User = require('../models/User');

const verifyUser = require('../routes/middlewares/authorization').verifyUser;

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log('req.session: ', req.session);
  try {
    const votingList = await Vote.find().populate('author', 'name').lean().exec();

    console.log(votingList);

    res.render('index', { user: req.session.user, votingList });
  } catch (error) {
    next(error);
  }
});

router.get('/my-votings', verifyUser, async (req, res, next) => {
  const { session } = req;

  try {
    const user = await User.findById(session.user._id).populate('myVoteList');

    console.log(user);

    res.render('myVotings', { user: session.user, votingList: user.myVoteList });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
