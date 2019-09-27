const express = require('express');
const router = express.Router();
const Voting = require('../models/Voting');
const { addIsOnProgressPropertyTo, switchIdToName } = require('../util');

// My Votings router

router.get('/', async (req, res, next) => {
  const myVotings = await Voting.find({ creator: req.user._id });
  const editedMyVotings = await Promise.all(
    await myVotings.map(async myVoting => {
      const editedMyVoting = JSON.parse(JSON.stringify(myVoting._doc));
      await addIsOnProgressPropertyTo(editedMyVoting, myVoting);
      return editedMyVoting;
    })
  );
  res.render('votings', {
    user: req.user,
    votings: editedMyVotings
  });
});

// New router

router.get('/new', (req, res, next) => {
  res.render('new', {
    user: req.user,
    votings: null
  });
});

router.post('/new', async (req, res, next) => {
  const options = req.body.option;
  const items = [];
  options.forEach(option => {
    items.push({
      text: option,
      voters: []
    });
  });
  try {
    await Voting.create({
      title: req.body.title,
      description: req.body.description,
      end_at: new Date(`${req.body.closingDate}T${req.body.closingTime}`),
      creator: req.user._id,
      items
    });
    res.redirect('/');
  } catch {
    const err = new Error('Cannot create voting in DB');
    next(err);
  }
});


// Each voting router

router.get('/:voting_id', async (req, res, next) => {
  const voting = await Voting.findOne({ _id: req.params.voting_id });
  const isCreator = String(voting.creator) === String(req.user._id);
  const editedVoting = JSON.parse(JSON.stringify(voting));
  addIsOnProgressPropertyTo(editedVoting, voting);
  res.render('voting', {
    voting_id: req.params.voting_id,
    user: req.user,
    voting: editedVoting,
    isCreator
  });
});

router.post('/:voting_id/update', async (req, res, next) => {
  const votingId = req.url.slice(1, req.url.lastIndexOf('/'));
  await Voting.update(
    {
      _id: votingId,
      'items._id': req.body.option
    },
    {
      $push: {
        'items.$.voters': req.user._id
      }
    }
  );
  res.redirect('/');
});

router.delete('/:voting_id', async (req, res, next) => {
  await Voting.findByIdAndDelete({
    _id: req.params.voting_id
  });
  res.status(201).end();
});

module.exports = router;
