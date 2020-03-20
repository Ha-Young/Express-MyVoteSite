const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');
const errors = require('../helpers/error');

router.delete('/votings/:vote_id', async (req, res, next) => {
  const { vote_id } = req.params;

  try {
    await Vote.deleteOne({ _id: vote_id });
    next();
  } catch (error) {
    next(new errors.GeneralError(error));
  }
})

module.exports = router;
