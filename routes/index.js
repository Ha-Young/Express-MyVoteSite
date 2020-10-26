const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/my-votings', function (req, res, next) {});

module.exports = router;
