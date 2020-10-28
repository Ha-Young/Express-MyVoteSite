const express = require('express');
const router = express.Router();
const gateKeeper = require('./middlewares/gateKeeper');
const { create, drop } = require('./controllers/votings.controller');
const Voting = require('../models/Voting');
const dayjs = require('dayjs');

router.get('/new', gateKeeper, (req, res, next) => {
  res.status(200).render('newVoting');
});

router.post('/new', gateKeeper, create);

router.get('/:_id', async (req, res, next) => {
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

  res.status(200).render('votingDetails', {
    voting,
    userIsCreator,
    isExpired,
    formattedExpirationDate
  });
});

router.put('/:_id', gateKeeper, async (req, res, next) => {
  const { selectedOptionValue } = req.body;
  const currentUser = req.session.userId;

  try {
    const voting = await Voting.findById(req.params._id);
    const { options } = voting;

    for (const option of options) {
      for (const voter of option.voters) {
        if (voter.toString() === currentUser) {
          res.json({ message: '이미 투표했습니다' });

          return;
        }
      }
    }

    for (const option of options) {
      if (option.content === selectedOptionValue) {
        option.voters.push(currentUser);
      }
    }

    await Voting.findByIdAndUpdate(
      req.params._id,
      voting,
      { new: true },
    );

    res.json({
      result: 'ok',
      message: '투표 완료',
    });
  } catch (err) {
    next(err);
  }
});

router.get('/drop/:_id', gateKeeper, drop);

module.exports = router;
