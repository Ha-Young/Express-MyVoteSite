const express = require('express');
const router = express.Router();
const isLoggedIn = require('./middleware/isLoggedIn');
const votingsController = require('./controllers/votings.controller');

router.get('/new', isLoggedIn, votingsController.get);

module.exports = router;
