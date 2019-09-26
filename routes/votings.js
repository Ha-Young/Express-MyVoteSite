const express = require('express');
const router = express.Router();
const Voting = require('../models/Voting');
const mongoose = require('mongoose');

router.get('/', function(req, res, next) {
  Voting.find()
  .populate('creator', 'name')
  .exec((err, voting) => {
    res.render('my', { user: req.user, title: 'my votings', voting });
  });
});

router.delete('/:voting_id', async function(req, res, next) {
  try {
    await Voting.findByIdAndDelete({_id: req.params.voting_id });
    res.status(201).end();
  } catch (error) {
    next(err);
  }
})

router.get('/new', function(req, res, next) {
  res.render('new');
});

router.get('/success', function(req, res, next) {
  res.render('success', { message: '투표생성성공' });
});

router.get('/error', function(req, res, next) {
  res.render('error', { message: '투표생성실패' });
});

router.post('/new', function(req, res, next) {
  const { title, expiration, option, description } = req.body;
  const item = [];
  for (let i = 0; i < option.length; i++) {
    let optionObj = { option: option[i], voters: [] };
    item.push(optionObj);
  }
  const newVoting = new Voting({
    title,
    description,
    creator: req.user._id,
    expiration,
    items: item
  });
  newVoting
    .save()
    .then(user => {
      res.redirect('/votings/success');
    })
    .catch(err => {
      res.redirect('/votings/error');
    });
});

router.get('/:voting_id', function(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.voting_id)) {
    return next();
  }
  Voting.findOne({ _id: req.params.voting_id }, function(err, voting) {
    if (!err) {
      res.render('voting', { user: req.user, voting });
    } else {
      next(err);
    }
  });
});

module.exports = router;
