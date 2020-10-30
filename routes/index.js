const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Vote = require('../models/Vote');

router.get('/', async (req, res, next) => {
  try {
    const isLoggedIn = req.session.passport ? true : false;
    const user = isLoggedIn ? await User.findOne({ email: req.session.passport.user.email }) : undefined;

    const allVotesList = await Vote.find({});
    const expiredMemoArray = [];

    for (let i = 0; i < allVotesList.length; i++) {
      const due = allVotesList[i].dueDate.valueOf();
      const now = new Date().valueOf();

      expiredMemoArray[i] = due > now ? false : true;
    }

    const votedMemoArray = [];
    if (isLoggedIn && user) {
      for (let i = 0; i < allVotesList.length; i++) {
        let isChecked = false;

        for (let j = 0; j < allVotesList[i].voter.length; j++) {
          if (user._id.equals(allVotesList[i].voter[j]._id)) {
            votedMemoArray[i] = true;
            isChecked = true;
            break;
          }
        }

        if (!isChecked) {
          votedMemoArray[i] = false;
        }
      }
    }

    res.render('index', {
      isLoggedIn: isLoggedIn,
      user: user,
      voteList: allVotesList,
      expired: expiredMemoArray,
      voted: votedMemoArray
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
