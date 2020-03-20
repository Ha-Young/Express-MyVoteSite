const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');
const { authorization } = require('../middlewares/authorization');
const { duplicateVoting } = require('../middlewares/duplicateVoting');
const _ = require('lodash');
const errors = require('../helpers/error');

router.get('/new', authorization, async (req, res, next) => {
  const { isAnonymousUser } = res.locals;

  if (isAnonymousUser) {
    return res.redirect('/login');
  }

  res.render('createVote');
});

router.post('/new', async (req, res, next) => {
  let { title, options, expirationDate } = req.body;
  const { _id, nickname } = req.user;

  options = options.map(option => ({
    optionTitle: option
  }));

  try {
    await Vote.create({
      title,
      options,
      creator: _id,
      creatorNickname: nickname,
      expirationDate
    });
  } catch (error) {
    next(new errors.GeneralError(error));
  }

  res.redirect('/');
})

router.get('/:vote_id', async (req, res, next) => {
  const { vote_id } = req.params;
  let { isParticipated } = res.locals;

  try {
    await Vote.findOne({ _id: vote_id })
    .exec((err, vote) => {
      if (req.user) {
        if (_.isEqual(vote.creator, req.user._id)) {
          return res.render('creator', { vote });
        }
      }
      res.render('vote', { vote, isParticipated });
    });
  } catch (error) {
    next(new errors.GeneralError(error));
  }
});

router.post('/:vote_id', authorization, duplicateVoting, async (req, res, next) => {
  const { isAnonymousUser } = res.locals;
  const visited = req.headers.referer;

  if (isAnonymousUser) {
    return res.redirect(`/login?vote=${visited}`);
  }

  const { selected } = req.body;
  const { vote_id } = req.params;
  const participant = req.user._id;

  try {
    await Vote.updateOne({
      _id: vote_id,
      'options._id': selected
    }, {
      $inc: { 'options.$.count': 1 },
      $push: { participants: participant }
    });
  } catch (error) {
    next(new errors.GeneralError(error));
  }

  res.redirect('/');
});

router.delete('/api/votings/:vote_id', async (req, res, next) => {
  const { vote_id } = req.params;

  try {
    await Vote.deleteOne({ _id: vote_id });
  } catch (error) {
    next(new errors.GeneralError(error));
  }
})

module.exports = router;
