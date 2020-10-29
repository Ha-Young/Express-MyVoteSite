const express = require('express');
const router = express.Router();
const categorizeVotings = require('../utils/categorizeVotings');
const gateKeeper = require('./middlewares/gateKeeper');
const Voting = require('../models/Voting');

router.get('/', async (req, res, next) => {
  try {
    const [openVotingsData, expiredVotingsData]
      = await categorizeVotings({ created_by: req.session.userId });

    res.status(200).render('index', { openVotingsData, expiredVotingsData });
  } catch (err) {
    next(err);
  }
});

router.get('/my-votings', gateKeeper, async (req, res, next) => {
  try {
    const [openVotingsData, expiredVotingsData] = await categorizeVotings({ created_by: req.session.userId }, false);

    res.status(200).render('myVotings', { openVotingsData, expiredVotingsData });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
