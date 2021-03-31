var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', function(req, res, next) {
  res.send('respond with a resource');
});

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
