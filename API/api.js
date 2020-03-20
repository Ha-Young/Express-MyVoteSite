const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');

router.delete('/votings/:vote_id', async (req, res, next) => {
  const { vote_id } = req.params;

  try {
    await Vote.deleteOne({ _id: vote_id });
  } catch (error) {
    console.log(error);
  }
  next();
})

module.exports = router;
