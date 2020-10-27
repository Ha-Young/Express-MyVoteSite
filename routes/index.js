const express = require('express');

const Vote = require('../models/Vote');

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log('req.session: ', req.session);
  try {
    const votingList = await Vote.find().populate('author', 'name').lean().exec();
    res.render('index', { user: req.session.user, votingList });
  } catch (error) {
    next(error);
  }
});

router.get('/my-votings', (req, res, next) => {});

module.exports = router;
