const express = require('express');
const router = express.Router();

const Vote = require('../models/Vote');

router.get('/', async (req, res, next) => {
  const { user } = req.session.passport;
  console.log(user)
  const userVotes = Vote.find({ creator: user }, (err, doc) => {
    // console.log(doc, '닥')
  });

  res.render('myVotes', { myVotes: userVotes });
});

module.exports = router;
