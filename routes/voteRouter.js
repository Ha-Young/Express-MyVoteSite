var express = require('express');
var router = express.Router();

const { isSignIn, redirectIfUserNone, responseIfUserNone } = require("../middleware/authentification");
const { getNewVote, postNewVote, getVoteDetail, putVoteDetail, deleteVote } = require("../controller/vote.controller");

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', isSignIn, redirectIfUserNone, getNewVote);
router.post('/new', isSignIn, redirectIfUserNone, postNewVote);

router.get('/:vote_id', isSignIn, getVoteDetail);
router.put('/:vote_id', isSignIn, responseIfUserNone, putVoteDetail);
router.delete('/:vote_id', deleteVote);

module.exports = router;
