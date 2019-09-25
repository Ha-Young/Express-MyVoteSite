const express = require('express');
const router = express.Router();
const Votings = require('../models/Voting');
const mongoose = require('mongoose');

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
    let opt = { option: option[i], voters: [] };
    item.push(opt);
  }
  const newVoting = new Votings({
    title,
    description,
    user: req.user._id,
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

module.exports = router;
