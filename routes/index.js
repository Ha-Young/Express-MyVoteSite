var express = require('express');
var router = express.Router();
const { expiryMonitor } = require('../middlewares/expiryMonitor');
const Voting = require('../models/Voting');
const User = require('../models/User');

router.get('/', expiryMonitor, async(req, res, next) => {
  let votings = await Voting.find().exec();
  votings = JSON.parse(JSON.stringify(votings));
  const users = votings.map((voting) => {
    return new Promise(async(resolve, reject) => {
      const user = await User.findById(voting.author).exec();
      voting.authorName = user.username;
      resolve();
    });
  });
  await Promise.all(users);
  res.render('index', { user: req.user, votings });
});

module.exports = router;
