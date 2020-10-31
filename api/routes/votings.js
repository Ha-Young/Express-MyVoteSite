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

const router = express.Router();

router.get('/new', isLoggedIn, setLocals, GETNew);
router.post('/new', isLoggedIn, POSTNew);
router.get('/:votingId', setLocals, GETVotings);
router.put('/:votingId', isLoggedIn, setLocals, PUTVotings);
router.delete('/:votingId', isLoggedIn, setLocals, DELETEVotings);

module.exports = router;
