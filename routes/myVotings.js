const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');
const { duplicateVoting } = require('../middlewares/duplicateVoting');

router.get('/', duplicateVoting, async (req, res, next) => {
  const { isAnonymousUser } = res.locals;

  if(isAnonymousUser) {
    res.redirect('/login');
  }

  const myId = req.user._id;
  const myVotes = await Vote.find({ creator: myId }).populate('creator');
  res.render('myVotes', { myVotes });

});

module.exports = router;
