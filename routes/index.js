const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');
const Voting = require('../models/Voting');
const User = require('../models/User');
const { koLocale } = require('date-fns/locale/ko');
var format = require('date-fns/format')

/* GET home page. */
router.get('/', isLoggedIn, async(req, res, next) => {

  let votings = JSON.parse(JSON.stringify(await Voting.find()));
  const users = JSON.parse(JSON.stringify(await User.find()));

  votings = votings.map(voting => {
    const creator = users.find(user => voting.created_by_id === user._id);
    return {
      ...voting,
      creator: creator.nickname,
      completeDate: format(new Date(voting.complete_at), 'yyyy년 MM월 dd일 hh시 mm분', {locale: koLocale})
    };
  });

  res.render('index', { 
    votings,
    todayDate: new Date().toISOString()
   });
});

module.exports = router;
