var express = require('express');
var router = express.Router();

const { isSignIn, redirectIfUserNone } = require("../middleware/authentification");

const { getNewVote, postNewVote } = require("../controller/vote.controller");

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

router.get('/:vote_id', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
