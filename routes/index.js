const express = require('express');
const router = express.Router();
const sortVotings = require('../utils/sortVotings');

router.get('/', async (req, res, next) => {
  const [openVotings, expiredVotings] = await sortVotings();

  res.render('index', { openVotings, expiredVotings });
});

module.exports = router;
