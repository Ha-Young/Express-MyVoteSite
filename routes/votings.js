const express = require('express');
const router = express.Router();
const gateKeeper = require('./middlewares/gateKeeper');
const { create } = require('./controllers/votings.controller');
const Voting = require('../models/Voting');
const dayjs = require('dayjs');

router.get('/new', gateKeeper, (req, res, next) => {
  res.status(200).render('newVoting');
});

router.post('/new', gateKeeper, create);

router.get('/:_id', gateKeeper, async (req, res, next) => {
  const voting = await Voting.findById(req.params._id);

  let userIsCreator = false;
  let isExpired = false;
  const expirationDate = Date.parse(voting.expires_at);
  const formattedExpirationDate = dayjs(expirationDate).format('YYYY-MM-DD HH:mm');

  if (req.session.userId === voting.created_by.toString()) {
    userIsCreator = true;
  }

  if (expirationDate < Date.now()) {
    isExpired = true;
  }

  res.status(200).render('votingsDetails', {
    voting,
    userIsCreator,
    isExpired,
    formattedExpirationDate
  });
});

router.post('/:_id', gateKeeper, async (req, res, next) => {
  console.log(req.body);
});

module.exports = router;
