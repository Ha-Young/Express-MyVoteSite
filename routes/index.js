const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next) {
  console.log('req.session: ', req.session);

  res.render('index', { user: req.session.user });
});

router.get('/my-votings', function (req, res, next) {});

module.exports = router;
