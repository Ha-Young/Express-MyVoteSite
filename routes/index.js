var express = require('express');
var router = express.Router();
const { expiryMonitor } = require('../middlewares/expiryMonitor');
const Voting = require('../models/Voting');
const User = require('../models/User');

router.get('/', expiryMonitor, async(req, res, next) => {
  try {
    let votings = await Voting.find().exec(); // error
    votings = JSON.parse(JSON.stringify(votings));
    const users = votings.map((voting) => {
      return new Promise(async(resolve, reject) => {
        const user = await User.findById(voting.author).exec(); // error
        voting.authorName = user.username;
        resolve();
      });
    });
    await Promise.all(users);
    res.render('index', { user: req.user, votings });
  } catch (err) {
    if (err.name === 'MongoError') {
      console.log('Error while fetching votes and author names from DB\n', err);
      next(err);
    }
  }
});

module.exports = router;
