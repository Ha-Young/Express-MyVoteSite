const express = require('express');
const router = express.Router();
const gateKeeper = require('./middlewares/gateKeeper');
const checkHasSelectedOption = require('./middlewares/checkHasSelectedOption');
const validateVote = require('./middlewares/validateVote');
const { create, drop, applyVote } = require('./controllers/votingsManagement.controller');
const { getOne } = require('./controllers/getVotings.controller');

router.get('/new', gateKeeper, (req, res, next) => {
  res.status(200).render('newVoting');
});
router.post('/new', gateKeeper, validateVote, create);

router.get('/:_id', getOne);
router.put('/:_id', gateKeeper, checkHasSelectedOption, applyVote);
router.delete('/:_id', gateKeeper, drop);

module.exports = router;
