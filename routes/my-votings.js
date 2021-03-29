const express = require("express");
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('my-votings', { title: 'My Votings' });
});

module.exports = router;
