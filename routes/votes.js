const router = require('express').Router();
const vote = require('../models/Vote');

router.get('/:id', async (req, res) => {
  const votes = await vote.find({});

  const findIndex = votes.findIndex(
    vote => vote.id === parseInt(req.params.id)
  );

  res.render('votes', { user: req.user, votes, findIndex });
});

router.post('/success', async (req, res) => {
  const votes = await vote.find({});

  const findIndex = votes.findIndex(
    vote => vote.id === parseInt(req.params.id)
  );

  res.render('success', { user: req.user, votes, findIndex });
});

module.exports = router;
