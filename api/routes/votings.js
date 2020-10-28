const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const VotingServices = require('../../services/voting');

const router = express.Router();
const votingServices = new VotingServices();

router.get('/new', (req, res) => {
  if (req.session.user) {
    res.locals.username = req.session.user.username
  }

  res.render('new_voting');
});

router.get('/my-votings', (req, res) => {
  if (req.session.user) {
    res.locals.username = req.session.user.username
  }

  res.render('my_votings');
});

router.get('/:votingId', async (req, res) => {
  const result = await votingServices.findVoting({ _id: req.params.votingId });

  let locals = {};

  // 찾지 못한 경우
  if (result.length === 0) {
    locals = {
      subject: '못찾았어요..'
    };
  } else {
    const { subject, description, candidates } = result[0];
    locals = {
      subject,
      description,
      candidates
    };
  }

  if (req.session.user) {
    res.locals.username = req.session.user.username
  }

  res.render('voting', locals);
});

router.post('/new', async (req, res) => {
  console.log(req.body);

  try {
    const result = await votingServices.createVoting(req.body);

    console.log(result);

    res.redirect('/votings/new');
  } catch (err) {
    next(err);
  }
});


module.exports = router;
