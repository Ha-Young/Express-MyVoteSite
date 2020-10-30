const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Vote = require('../models/Vote');

router.get('/', async (req, res, next) => {
  try {
    const isLoggedIn = req.session.passport ? true : false;
    const user = isLoggedIn ? req.session.passport.user.email : undefined;

    const userInfo = await User.findOne({ email: user }).populate('voteId').exec();
    const allVotesInfo = await Vote.find();

    const voteMadeByUser = [];

    allVotesInfo.forEach((vote) => {
      if (vote.author.objectIdInDB.equals(userInfo._id)) {
        voteMadBuIser.push(vote);
      }
    });

    res.render('myVotings', {
      isLoggedIn: isLoggedIn,
      user: userInfo,
      voteMadeByUser: voteMadeByUser
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
