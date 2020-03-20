const express = require('express'),
      router = express.Router(),
      Vote = require('../models/Vote'),
      { authenticateUser } = require('./middlewares/authorization');

router.get('/', authenticateUser, async (req, res, next) => {
  const vote = await Vote.find({ creator: req.user.id });
  res.render('my-votings', { vote: vote });
});

module.exports = router;
