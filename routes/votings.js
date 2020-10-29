const express = require('express');
const router = express.Router();
const gateKeeper = require('./middlewares/gateKeeper');
const { create, drop, applyVote } = require('./controllers/votingsManagement.controller');
const { getOne } = require('./controllers/getVotings.controller');

router.get('/new', gateKeeper, (req, res, next) => {
  res.status(200).render('newVoting');
});
router.post('/new', gateKeeper, create);

router.get('/:_id', getOne);
router.put('/:_id', gateKeeper, applyVote);

router.get('/drop/:_id', gateKeeper, drop);

module.exports = router;
