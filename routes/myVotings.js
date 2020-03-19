const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');

router.get('/', async (req, res, next) => {
  const myId = req.user._id;

  const myVotes = await Vote.find({ creator: myId }).populate('creator');
  res.render('myVotes', { myVotes });

});

module.exports = router;
