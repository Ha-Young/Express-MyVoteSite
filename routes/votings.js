const express = require('express');
const router = express.Router();
const checkUser = require('../middlewares/checkUser');
const { findUser } = require('../utils/helpers');
const Voting = require('../models/Voting');
const moment = require('moment');

router.get('/new', checkUser, async (req, res) => {
  const user = await findUser(req);

  res.render('voting-creation', { user });
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const voting = await Voting.findById(id).populate('user', 'nickname');
    console.log(voting);

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
    const selections = selection.map(el => {
      return {
        selection_item: el,
        count: 0
      };
    });
    const creationDate = new Date(`${date} ${time}`);
    console.log(creationDate);

    await new Voting({
      user,
      title,
      selection_items: selections,
      created_at: creationDate.toISOString()
    }).save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

router.post('/:id/selection/:id2', async (req, res) => {
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
