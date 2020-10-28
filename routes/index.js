const express = require('express');
const router = express.Router();
const sortVotings = require('../utils/sortVotings');
const gateKeeper = require('./middlewares/gateKeeper');
const Voting = require('../models/Voting');

router.get('/', async (req, res, next) => {
  try {
    const [openVotingsData, expiredVotingsData] = await sortVotings();

    res.status(200).render('index', { openVotingsData, expiredVotingsData });
  } catch (err) {
    next(err);
  }
});

router.get('/my-votings', gateKeeper, async (req, res, next) => {
  try {
    const [openVotingsData, expiredVotingsData] = await sortVotings({ created_by: req.session.userId });

    res.status(200).render('myVotings', { openVotingsData, expiredVotingsData });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
