var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next) {
  res.render('createVote');
});

module.exports = router;
