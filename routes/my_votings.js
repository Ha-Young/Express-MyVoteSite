var express = require('express');
var router = express.Router();
const { authorization } = require('../middlewares/authorization');
const { expiryMonitor } = require('../middlewares/expiryMonitor');
const Voting = require('../models/Voting');
const User = require('../models/User');

router.get('/', authorization, expiryMonitor, async(req, res, next) => {
  let votings;
  try {
    votings = await Voting.find({ author: req.user._id }).exec();
  } catch (err) {
    console.log('Error while fetching votings of a certain user from DB');
    next(err);
  }

  try {
    votings = JSON.parse(JSON.stringify(votings));
    const users = votings.map((voting) => {
      return new Promise(async(resolve, reject) => {
        try {
          const user = await User.findById(voting.author).exec();
          voting.authorName = user.username;
          resolve();
        } catch (err) {
          console.log('Error while fetching author names per voting');
          next(err);
        }
      });
    });
    await Promise.all(users);
    res.render('my_votings', { user: req.user, votings });
  } catch (err) {
    console.log('Error while fetching author names for all votings');
    next(err);
  }
});

module.exports = router;
