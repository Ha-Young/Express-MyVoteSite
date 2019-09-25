const express = require('express');
const router = express.Router();
const Votings = require('../models/Voting');
const mongoose = require('mongoose');

router.get('/new', function(req, res, next) {
  res.render('new');
});

router.post('/new', function(req, res, next) {
});

module.exports = router;
