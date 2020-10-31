const express = require('express');
const router = express.Router();
const gateKeeper = require('./middlewares/gateKeeper');
const checkHasSelectedOption = require('./middlewares/checkHasSelectedOption');
const checkHasVoted = require('./middlewares/checkHasVoted');
const validateVote = require('./middlewares/validateVote');
const { create, drop, applyVote } = require('./controllers/votingsManagement.controller');
const { getOne } = require('./controllers/getVotings.controller');
const { NEW, ID_VARIABLE } = require('../constants/urls');
const { NEW_VOTING } = require('../constants/views');

router.get(NEW, gateKeeper, (req, res, next) => {
  res.status(200).render(NEW_VOTING);
});
router.post(NEW, gateKeeper, validateVote, create);

router.get(ID_VARIABLE, getOne);
router.put(
  ID_VARIABLE,
  gateKeeper,
  checkHasSelectedOption,
  checkHasVoted,
  applyVote
);
router.delete(ID_VARIABLE, gateKeeper, drop);

module.exports = router;
