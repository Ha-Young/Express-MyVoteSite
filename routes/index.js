const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');
const Voting = require('../models/Voting');
const User = require('../models/User');
const { koLocale } = require('date-fns/locale/ko');
const format = require('date-fns/format');

/* GET home page. */
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const votings = JSON.parse(JSON.stringify(await Voting.find()));
    const users = JSON.parse(JSON.stringify(await User.find()));

    const votingArr = votings.map(voting => {
      const author = users.find(user => voting.created_by_id === user._id);
      return {
        ...votes,
        author: author.nickname,
        completeDate: format(
          new Date(voting.complete_at),
          'yyyy년 MM월 dd일 hh시 mm분',
          { locale: koLocale }
        )
      };
    });

    res.render('index', {
      votingArr,
      todayDate: new Date().toISOString()
    });
  } catch (error) {
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err);
  }
});

module.exports = router;
