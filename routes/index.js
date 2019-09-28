var express = require('express');
var router = express.Router();
const Votings = require('../models/Votings');

router.get('/', async(req, res, next) => {
  const votings = await Votings.find({});
  res.render('index', {
    title: 'voting-platform',
    user: req.user,
    votings
  });
});

module.exports = router;
