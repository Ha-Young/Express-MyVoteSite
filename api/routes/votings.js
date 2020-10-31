const express = require('express');
const {
  isLoggedIn,
  setLocals
} = require('../middlewares/middlewares');
const {
  GETNew,
  POSTNew,
  GETVotings,
  PUTVotings,
  DELETEVotings
} = require('./controllers/voteController');
const {
  ROUTES_VOTE,
} = require('../../config/constants');

const router = express.Router();

router.get(ROUTES_VOTE.NEW, isLoggedIn, setLocals, GETNew);
router.post(ROUTES_VOTE.NEW, isLoggedIn, POSTNew);
router.get(ROUTES_VOTE.VOTING_ITEM, setLocals, GETVotings);
router.put(ROUTES_VOTE.VOTING_ITEM, isLoggedIn, setLocals, PUTVotings);
router.delete(ROUTES_VOTE.VOTING_ITEM, isLoggedIn, setLocals, DELETEVotings);

module.exports = router;
