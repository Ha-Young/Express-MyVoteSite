const express = require('express');
const router = express.Router();
const { isLoggedIn, convertDate } = require('./middlewares');
const Vote = require('../models/Vote');
const User = require('../models/User');

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const voteList = await Vote.find({});
    const votes = await Promise.all(voteList.map(async vote => {
      const user = await User.findById(vote.created_by);
      const voteDoc = JSON.parse(JSON.stringify(vote._doc));
      const nowDate = new Date();

      voteDoc.name = user.name;

      if (vote.expired_at - nowDate > 0) {
        voteDoc.status = '진행중';
      } else {
        voteDoc.status = '종료';
      }

      voteDoc.created_at = convertDate(vote.created_at);
      voteDoc.expired_at = convertDate(vote.expired_at);

      if (String(req.user._id) === String(vote.created_by)) {
        voteDoc.isUser = true;
      } else {
        voteDoc.isUser = false;
      }

      return voteDoc;
    }));

    res.render('index', {
      title: 'voting',
      votes
    });
  } catch (err) {
    next();
  }
});

module.exports = router;
