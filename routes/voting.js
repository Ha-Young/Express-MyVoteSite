const express = require('express');
const mongoose = require('mongoose');

const errors = require('../lib/errors');

const checkAuthentication = require('../middlewares/authenticate');
const Users = require('../models/Users');
const Votes = require('../models/Votes');

const router = express.Router();

router.get('/new', checkAuthentication, (req, res, next) => res.render('newvotes'));

router.post('/', checkAuthentication, async (req, res, next) => {
  const { title, expiration, ...options } = req.body;
  const select_options = [];

  if (new Date(expiration).toISOString() < new Date().toISOString()) {
    return next(new errors.InvalidExpirationError());
  }

  Object.values(options).forEach(option => {
    const temp = {};
    temp.description = option;
    temp.vote_counter = 0;
    temp.voter = [];

    select_options.push(temp);
  });

  console.log(select_options);

  const newVote = new Votes({
    title,
    select_options,
    created_by: req.user._id,
    expires_at: new Date(expiration).toISOString()
  });

  await newVote.save();


  // const { title, ...options } = req.body;
  // const optionList = Object.values(options);

  // const { _id, votes_created } = req.user;
  // votes_created.push({ title, optionList });

  // Vote.findOneAndUpdate()

  // const user = await Users.findByIdAndUpdate(_id, { votes_created }, { new: true });
  // console.log(user);

});

module.exports = router;


// req.body = {
//   title: 'test',
//   option1: '12',
//   option2: '34',
//   option3: '56',
//   option4: '78'
// }