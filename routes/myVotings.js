const express = require('express');
const router = express.Router();
const Voting = require('../models/Voting');
const checkAuth = require('../middlewares/authenticate');

router.get('/', checkAuth, async (req, res, next) => {
  try {
    const myVotings = await Voting.find({ createdBy: req.user._id }).populate('createdBy').lean();

    myVotings.forEach(voting => {
      voting.author = voting.createdBy.username;
    });

    res.render('myVotings', { votings: myVotings });
  } catch(err) {
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
});

module.exports = router;
