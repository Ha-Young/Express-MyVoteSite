const express = require('express');
const router = express.Router();
const checkUser = require('../middlewares/checkUser');
const { findUser } = require('../utils/helpers');
const Voting = require('../models/Voting');

router.get('/new', checkUser, async (req, res) => {
  const user = await findUser(req);

  res.render('voting-creation', { user });
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

    await new Voting({
      user,
      title,
      selection_items: selections,
      created_at: date
    }).save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
