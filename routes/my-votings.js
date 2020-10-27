const express = require('express');
const { authenticate } = require('./middlewares/authenticate');
const router = express.Router();

router.get('/', authenticate, (req, res, next) => {
  res.render('my-votings');
});

module.exports = router;
