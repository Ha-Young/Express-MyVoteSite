const express = require('express');
const router = express.Router();
const gateKeeper = require('./middlewares/gateKeeper');
const { create } = require('./controllers/votings.controller');

router.get('/new', gateKeeper, (req, res, next) => {
  res.status(200).render('newVoting');
});

router.post('/new', gateKeeper, create);

module.exports = router;
