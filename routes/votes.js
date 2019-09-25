const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');
const { convertDate } = require('../utils/utils');

router.get('/', (req, res, next) => {
  try {
    Vote.find({
      user_id: req.user._id,
    })
    .populate('user_id')
    .exec((err, votes) => {
      if (err) {
        return handleError(err);
      }

      const voteCollection = votes.map(vote => {
        vote.converted_date = convertDate(vote.expired_at);
        return vote;
      });

      return res.render('index', { votes: voteCollection, loginMessage: null });
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/new', async (req, res, next) => {
  res.render('votings_new', {
    message: req.flash('errorMessage')[0]
  });
});

router.post('/new', async (req, res, next) => {
  try {
    const options = req.body.options.map((option) => {
      return {
        title: option,
        voted_user: []
      };
    });

    const DATE_REGEX = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])([1-9]|[01][0-9]|2[0-3])([0-5][0-9])$/;

    let { expired_at } = req.body;

    if (!DATE_REGEX.test(expired_at.join(''))) {
      req.flash('errorMessage', 'Not a valid date or time format');
      return res.redirect("/votings/new");
    }

    const dates = expired_at.map((date, i) => (i === 1) ? Number(date) - 1 : Number(date));

    if (new Date() - new Date(...dates) > 0) {
      req.flash('errorMessage', 'Expiry date should be greater than current date');
      return res.redirect("/votings/new");
    }

    const isoFormat = new Date(...dates).toISOString();

    await new Vote({
      user_id: req.user._id,
      ...req.body,
      expired_at: isoFormat,
      options
    }).save();

    res.render('success');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.put('/vote', async (req, res, next) => {
  try {
    const { voteId, optionId } = req.body;
    const { _id: userId } = req.user;

    const targetVote = await Vote.findById(voteId);
    const hasDuplicateVote = targetVote.options.find(option => option.voted_user.indexOf(userId) > -1);

    if (!hasDuplicateVote) {
      const targetIndex = targetVote.options.findIndex(option => option._id.toString() === optionId);
      targetVote.options[targetIndex].voted_user.push(userId);

      await targetVote.save();
      return res.json({ success: 'Voted Successfully!' });
    }

    return res.json({ fail: 'Already voted!' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:voteId', (req, res, next) => {
  try {
    const { voteId } = req.params;
    const { _id: userId } = req.user;

    Vote.findById(voteId)
    .populate('user_id')
    .exec((err, vote) => {
      if (err) {
        return handleError(err);
      }

      let isSameUser = false;

      if (userId.toString() === vote.user_id._id.toString()) {
        isSameUser = true;
      }

      vote.converted_date = convertDate(vote.expired_at);

      return res.render('votings_detail', { vote, isSameUser });
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:voteId', async (req, res, next) => {
  try {
    await Vote.findByIdAndDelete(req.params.voteId);

    res.json({ success: 'Deleted Successfully!' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
