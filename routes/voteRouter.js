var express = require('express');
var router = express.Router();

const { isSignIn, redirectIfUserNone } = require("../middleware/authentification");

const { getNewVote, postNewVote, getVoteDetail, putVoteDetail } = require("../controller/vote.controller");

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', isSignIn, redirectIfUserNone, getNewVote);
router.post('/new', isSignIn, redirectIfUserNone, postNewVote);

router.get('/success', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/error', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:vote_id', getVoteDetail);
router.put('/:vote_id', putVoteDetail);


module.exports = router;
