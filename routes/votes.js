const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');

router.get('/', async (req, res, next) => {
  
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
      req.flash('errorMessage', 'date should be YYYY MM DD hh mm format');
      return res.redirect("/votings/new");
    }

    const dates = expired_at.map((date, i) => (i === 1) ? Number(date) - 1 : Number(date));
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

router.get('/:voteId', (req, res, next) => {
  try {
    console.log(req.params)
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
