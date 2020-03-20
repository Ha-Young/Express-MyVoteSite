const express = require('express'),
      router = express.Router(),
      Vote = require('../models/Vote');

router.get('/', async (req, res, next) => {
  let message = req.flash('success');
  try {
    let vote = await Vote.find();
    res.render('index', { vote: vote, message: message });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
