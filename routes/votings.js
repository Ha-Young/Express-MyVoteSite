const express = require('express');
const router = express.Router();
const checkUser = require('../middlewares/checkUser');
const { findUser } = require('../utils/helpers');
const Voting = require('../models/Voting');
const moment = require('moment');
const error = require('../lib/error');

router.get('/new', checkUser, async (req, res) => {
  const user = await findUser(req);

  res.render('voting-creation', { user });
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const voting = await Voting.findById(id).populate('user', 'nickname');

    res.render('voting-detail', { voting, moment });
  } catch (err) {
    next(err);
  }
});

router.post('/new', checkUser, async (req, res) => {
  try {
    const {
      body: { 'voting-title': title, selection, date, time }
    } = req;
    const user = await findUser(req);
    const selectionItems = selection.map(element => {
      return {
        selection_item: element,
        count: 0
      };
    });
    const deadline = new Date(`${date} ${time}`).getTime();
    const currentTime = new Date().getTime();

    if (!title.trim() || !date.trim() || !time.trim()) {
      throw new error.VotingValidationError();
    }
    if (deadline < currentTime) throw new error.VotingTimeError();
    selectionItems.forEach(item => {
      if (!item.selection_item.trim()) {
        throw new error.VotingValidationError();
      }
    });
    await new Voting({
      user,
      title,
      selection_items: selectionItems,
      deadline: deadline
    }).save();
    console.log('==========');
    res.redirect('/');
  } catch (err) {
    console.log(err);
    if (
      err instanceof error.VotingTimeError ||
      err instanceof error.VotingValidationError
    ) {
      return res.render('voting-creation', { error: err.displayMessage });
    }
  }
});

router.post('/:id/selection/:id2', checkUser, async (req, res) => {
  const user = await findUser(req);
  const { id: votingId, id2: selectionId } = req.params;
  const target = await Voting.findOne(
    { _id: votingId, 'selection_items._id': selectionId },
    { 'selection_items.$': 1 }
  );
  let { count } = target.selection_items[0];

  await Voting.update(
    { 'selection_items._id': selectionId },
    {
      $set: {
        'selection_items.$.count': parseInt(count) + 1
      }
    }
  );
  const voting = await Voting.findById(votingId).populate('user', 'nickname');

  res.render('voting-success', { voting, moment });
});

module.exports = router;
