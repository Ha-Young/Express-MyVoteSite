const express = require('express');
const router = express.Router();
const votingController = require('../controller/votings.controller');

router.get('/', votingController.getAll);

router.post('/votings/new', function(req, res, next) {

});

router.get('/votings/:id', function(req, res, next) {

});

module.exports = router;
